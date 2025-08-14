<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTravelOrderRequest;
use App\Http\Requests\UpdateTravelOrderRequest;
use App\Models\TravelOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TravelOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $travelOrders = TravelOrder::with(['creator', 'approver'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('travel-orders/index', [
            'travelOrders' => $travelOrders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('travel-orders/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTravelOrderRequest $request)
    {
        $data = $request->validated();
        
        // Handle different actions based on button clicked
        $action = $request->input('action', 'save');
        
        // Generate document number
        $data['document_number'] = TravelOrder::generateDocumentNumber($data['document_type']);
        $data['created_by'] = auth()->id();
        
        // Set status based on action
        if ($action === 'submit') {
            $data['status'] = 'pending_approval';
        } else {
            $data['status'] = 'draft';
        }
        
        $travelOrder = TravelOrder::create($data);

        $message = $action === 'submit' 
            ? 'Travel order created and submitted for approval successfully.'
            : 'Travel order created successfully.';

        return redirect()->route('travel-orders.show', $travelOrder)
            ->with('success', $message);
    }

    /**
     * Display the specified resource.
     */
    public function show(TravelOrder $travelOrder)
    {
        $travelOrder->load(['creator', 'approver']);
        
        return Inertia::render('travel-orders/show', [
            'travelOrder' => $travelOrder
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TravelOrder $travelOrder)
    {
        // Only allow editing draft documents
        if ($travelOrder->status !== 'draft') {
            return redirect()->route('travel-orders.show', $travelOrder)
                ->with('error', 'Only draft documents can be edited.');
        }
        
        return Inertia::render('travel-orders/edit', [
            'travelOrder' => $travelOrder
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTravelOrderRequest $request, TravelOrder $travelOrder)
    {
        $data = $request->validated();
        
        // Handle different actions based on button clicked
        $action = $request->input('action', 'update');
        
        // Set status based on action for draft documents
        if ($travelOrder->status === 'draft') {
            if ($action === 'submit') {
                $data['status'] = 'pending_approval';
            } elseif ($action === 'approve' && auth()->user()->can('approve', $travelOrder)) {
                $data['status'] = 'approved';
                $data['approved_by'] = auth()->id();
                $data['approved_at'] = now();
            } elseif ($action === 'reject' && auth()->user()->can('approve', $travelOrder)) {
                $data['status'] = 'rejected';
            }
        }
        
        // Handle approval/rejection for pending documents
        if ($travelOrder->status === 'pending_approval') {
            if ($action === 'approve') {
                $data['status'] = 'approved';
                $data['approved_by'] = auth()->id();
                $data['approved_at'] = now();
            } elseif ($action === 'reject') {
                $data['status'] = 'rejected';
            }
        }
        
        $travelOrder->update($data);

        $message = match($action) {
            'submit' => 'Travel order submitted for approval successfully.',
            'approve' => 'Travel order approved successfully.',
            'reject' => 'Travel order rejected.',
            default => 'Travel order updated successfully.'
        };

        return redirect()->route('travel-orders.show', $travelOrder)
            ->with('success', $message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TravelOrder $travelOrder)
    {
        // Only allow deleting draft documents
        if ($travelOrder->status !== 'draft') {
            return redirect()->route('travel-orders.index')
                ->with('error', 'Only draft documents can be deleted.');
        }
        
        $travelOrder->delete();

        return redirect()->route('travel-orders.index')
            ->with('success', 'Travel order deleted successfully.');
    }
}