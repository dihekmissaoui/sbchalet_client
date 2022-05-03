export interface IFacture {
    id?: number,
    montant?: number,
    reservationId?: number,
    isTotalPayment?: boolean,
    rest?: number,
    dateFacture?: Date,
}