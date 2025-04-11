export type Server = {
    id: string;
    name: string;
}

export type Channel = {
    id: string;
    name: string;
    server_id: string;
}

export type AccordMessage = {
    id: string;
    timestamp: number;
    username: string;
    message: string;
}
