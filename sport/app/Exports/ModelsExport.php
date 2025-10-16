<?php

namespace App\Exports;

use App\Models\BunnyModels\BunnuModel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ModelsExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return BunnuModel::with('prices')->get();
    }

    public function headings(): array
    {
        return [
            'Name',
            'Age',
            'Nationality',
            'Phone',
            'Email',
            'Height (cm)',
            'Weight (kg)',
            'Bust (cm)',
            'Waist (cm)',
            'Hips (cm)',
            'Language',
            'Living Country',
            'City',
            'Currency',
            'Description',
            'Lacal 1-2 Hr',
            'Lacal upto 3 Hr',
            'Lacal upto 6 Hr',
            'Over Night',
            'International 24H',
            'International 48H',
            'Additional Day',
        ];
    }

    public function map($model): array
    {
        return [
            $model->firstname,
            $model->age,
            $model->nationality,
            $model->phone,
            $model->email,
            $model->height,
            $model->weight,
            $model->bust,
            $model->waist,
            $model->hips,
            $model->hips,
            $model->languages,
            $model->city,
            $model->currency,
            $model->description,
            $model->prices[0]->incall_2h ?? '',
            $model->prices[0]->incall_3h ?? '',
            $model->prices[0]->incall_6h ?? '',
            $model->prices[0]->incall_12h ?? '',
            $model->prices[0]->outcall_1d ?? '',
            $model->prices[0]->outcall_3d ?? '',
            $model->prices[0]->outcall_ad ?? '',
        ];
    }
}