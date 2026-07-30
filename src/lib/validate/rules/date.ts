export const rangeDate = (min: number, max: number) => {
    return (value: string) => {
        if (value == '')
            return true
        const date = new Date(value);
        const currentDate = new Date();
        // Вычисляем минимальную допустимую дату (currentDate - min лет)
        const minAllowedDate = new Date(currentDate);
        minAllowedDate.setFullYear(minAllowedDate.getFullYear() - min);
        // Вычисляем максимальную допустимую дату (currentDate + max лет)
        const maxAllowedDate = new Date(currentDate);
        maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() + max);

        // Проверяем, что дата в диапазоне [minAllowedDate, maxAllowedDate]
        return date >= minAllowedDate && date <= maxAllowedDate;
    }
};