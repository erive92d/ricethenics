export type RunType = {
    authorId: string; // User's UID
    author: string;
    title: string;
    comment: string;
    park: string;
    location: string;
    timeStart: string;
    timeEnd: string;
    miles: number;
    createdAt: number; // Timestamp for sorting runs
};
