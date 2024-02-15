export interface IClientTransaction {
    id: string;
    clientId: string;
    clientTripId: string;
    transactionType: string;
    transactionAmount: number;
    createdOn: string;
}

