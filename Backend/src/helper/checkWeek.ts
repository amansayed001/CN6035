


export const isCurrentWeek = (document: any): boolean => {
    const createdAt = new Date(document.createdAt);
    const now = new Date();

    // Get the start of the current week
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(now.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);

    // Reset
    const currentNow = new Date();

    return createdAt >= startOfWeek && createdAt <= currentNow;
}
