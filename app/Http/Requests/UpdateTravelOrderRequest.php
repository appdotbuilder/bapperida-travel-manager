<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTravelOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $travelOrder = $this->route('travel_order');
        
        // Only allow updates if the document is in draft status
        return $travelOrder && $travelOrder->status === 'draft';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'document_type' => 'required|in:SPD,SPT',
            'employee_name' => 'required|string|max:255',
            'employee_nip' => 'required|string|max:50',
            'position' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'purpose' => 'required|string',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'document_type.required' => 'Document type is required.',
            'document_type.in' => 'Document type must be either SPD or SPT.',
            'employee_name.required' => 'Employee name is required.',
            'employee_nip.required' => 'Employee NIP is required.',
            'position.required' => 'Employee position is required.',
            'destination.required' => 'Destination is required.',
            'purpose.required' => 'Purpose of travel/assignment is required.',
            'start_date.required' => 'Start date is required.',
            'start_date.after_or_equal' => 'Start date cannot be in the past.',
            'end_date.required' => 'End date is required.',
            'end_date.after_or_equal' => 'End date must be after or equal to start date.',
            'budget.numeric' => 'Budget must be a valid number.',
            'budget.min' => 'Budget cannot be negative.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->has('start_date') && $this->has('end_date')) {
            $startDate = \Carbon\Carbon::parse($this->start_date);
            $endDate = \Carbon\Carbon::parse($this->end_date);
            $durationDays = $startDate->diffInDays($endDate) + 1;
            
            $this->merge([
                'duration_days' => $durationDays,
            ]);
        }
    }
}