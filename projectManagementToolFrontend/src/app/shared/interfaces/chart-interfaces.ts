export interface ChartObjectDataset {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: number[];
}

export interface ChartObject {
    labels: string[];
    datasets: ChartObjectDataset[];
}

export interface ChartObjectOptionsAxis {
    ticks: {
        color: string;
        font: {
            weight: number;
        };
    };
    grid: {
        color: string;
        drawBorder: boolean;
    };
}

export interface ChartObjectOptions {
    indexAxis: 'x' | 'y';
    maintainAspectRatio: boolean;
    aspectRatio: number;
    plugins: {
        legend: {
            labels: {
                color: string;
            };
        };
    };
    scales: {
        x: ChartObjectOptionsAxis;
        y: ChartObjectOptionsAxis;
    };
}

export interface ChartComponentInputListItem {
    // for projects and tasks
    itemTitle: string;
    itemDuration: number;
}
