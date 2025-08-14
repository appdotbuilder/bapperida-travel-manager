<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TravelOrder
 *
 * @property int $id
 * @property string $document_number
 * @property string $document_type
 * @property string $employee_name
 * @property string $employee_nip
 * @property string $position
 * @property string $destination
 * @property string $purpose
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property int $duration_days
 * @property float|null $budget
 * @property string $status
 * @property string|null $notes
 * @property int $created_by
 * @property int|null $approved_by
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $approver
 * @property-read \App\Models\User $creator
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder query()
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereApprovedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereBudget($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereDestination($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereDocumentNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereDocumentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereDurationDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereEmployeeName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereEmployeeNip($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder wherePurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder draft()
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder pendingApproval()
 * @method static \Illuminate\Database\Eloquent\Builder|TravelOrder approved()
 * @method static \Database\Factories\TravelOrderFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TravelOrder extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'document_number',
        'document_type',
        'employee_name',
        'employee_nip',
        'position',
        'destination',
        'purpose',
        'start_date',
        'end_date',
        'duration_days',
        'budget',
        'status',
        'notes',
        'created_by',
        'approved_by',
        'approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'duration_days' => 'integer',
        'budget' => 'decimal:2',
        'approved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'travel_orders';

    /**
     * Get the user who created this travel order.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who approved this travel order.
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Scope a query to only include draft documents.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    /**
     * Scope a query to only include pending approval documents.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePendingApproval($query)
    {
        return $query->where('status', 'pending_approval');
    }

    /**
     * Scope a query to only include approved documents.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Generate the next document number based on document type.
     *
     * @param string $type
     * @return string
     */
    public static function generateDocumentNumber(string $type): string
    {
        $year = date('Y');
        $month = date('m');
        
        $lastNumber = self::where('document_type', $type)
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->count();
            
        $nextNumber = str_pad((string)($lastNumber + 1), 3, '0', STR_PAD_LEFT);
        
        return "{$type}/{$nextNumber}/BAPPERIDA/{$month}/{$year}";
    }
}