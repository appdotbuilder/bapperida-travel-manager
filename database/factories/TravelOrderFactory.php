<?php

namespace Database\Factories;

use App\Models\TravelOrder;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TravelOrder>
 */
class TravelOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $documentType = $this->faker->randomElement(['SPD', 'SPT']);
        $startDate = $this->faker->dateTimeBetween('now', '+30 days');
        $endDate = $this->faker->dateTimeBetween($startDate, $startDate->format('Y-m-d') . ' +14 days');
        $durationDays = \Carbon\Carbon::parse($startDate)->diffInDays($endDate) + 1;
        
        return [
            'document_number' => $this->generateDocumentNumber($documentType),
            'document_type' => $documentType,
            'employee_name' => $this->faker->name(),
            'employee_nip' => $this->faker->numerify('##########'),
            'position' => $this->faker->randomElement([
                'Kepala Seksi',
                'Kepala Sub Bagian',
                'Staf Ahli',
                'Analis',
                'Penyusun Program',
                'Bendahara',
                'Sekretaris'
            ]),
            'destination' => $this->faker->randomElement([
                'Jakarta',
                'Medan',
                'Padang',
                'Gunungsitoli',
                'Sibolga',
                'Telukdalam',
                'Lahewa'
            ]),
            'purpose' => $this->faker->randomElement([
                'Rapat koordinasi perencanaan pembangunan daerah',
                'Monitoring dan evaluasi program pembangunan',
                'Pelatihan kapasitas SDM perencanaan',
                'Konsultasi penyusunan RPJMD',
                'Sosialisasi program pembangunan',
                'Supervisi kegiatan pembangunan',
                'Penyusunan dokumen perencanaan'
            ]),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'duration_days' => $durationDays,
            'budget' => $this->faker->optional(0.8)->randomFloat(2, 500000, 5000000),
            'status' => $this->faker->randomElement(['draft', 'pending_approval', 'approved', 'rejected']),
            'notes' => $this->faker->optional(0.6)->sentence(),
            'created_by' => User::factory(),
        ];
    }

    /**
     * Generate a document number.
     */
    protected function generateDocumentNumber(string $type): string
    {
        $year = date('Y');
        $month = date('m');
        $number = str_pad((string)random_int(1, 999), 3, '0', STR_PAD_LEFT);
        
        return "{$type}/{$number}/BAPPERIDA/{$month}/{$year}";
    }

    /**
     * Indicate that the travel order is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'approved_by' => null,
            'approved_at' => null,
        ]);
    }

    /**
     * Indicate that the travel order is pending approval.
     */
    public function pendingApproval(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending_approval',
            'approved_by' => null,
            'approved_at' => null,
        ]);
    }

    /**
     * Indicate that the travel order is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'approved_by' => User::factory(),
            'approved_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ]);
    }
}