<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('travel_orders', function (Blueprint $table) {
            $table->id();
            $table->string('document_number')->unique()->comment('Document number (SPD/SPT number)');
            $table->enum('document_type', ['SPD', 'SPT'])->comment('Type of document: SPD (Travel Order) or SPT (Assignment Order)');
            $table->string('employee_name')->comment('Name of the employee');
            $table->string('employee_nip')->comment('Employee ID number');
            $table->string('position')->comment('Employee position/rank');
            $table->string('destination')->comment('Travel/assignment destination');
            $table->text('purpose')->comment('Purpose of travel/assignment');
            $table->date('start_date')->comment('Start date of travel/assignment');
            $table->date('end_date')->comment('End date of travel/assignment');
            $table->integer('duration_days')->comment('Duration in days');
            $table->decimal('budget', 15, 2)->nullable()->comment('Budget allocated for the travel/assignment');
            $table->enum('status', ['draft', 'pending_approval', 'approved', 'rejected', 'completed'])->default('draft')->comment('Document status');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->timestamp('approved_at')->nullable()->comment('Approval timestamp');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('document_number');
            $table->index('document_type');
            $table->index('employee_nip');
            $table->index('status');
            $table->index(['status', 'created_at']);
            $table->index(['document_type', 'status']);
            $table->index(['start_date', 'end_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('travel_orders');
    }
};