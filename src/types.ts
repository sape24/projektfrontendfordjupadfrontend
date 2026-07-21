export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        imageLinks?: {
            thumbnail?: string;
        };
        publishedDate?: string;
    };
}

export interface Review {
    _id: string;
    bookId: string;
    userId: string;
    username: string;
    text: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export interface LoginType {
    token: string;
    username: string;
}

export interface AuthContextType {
    token: string | null;
    username: string | null;
    userId: string | null;
    login: (token:string, username: string, userId: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
}