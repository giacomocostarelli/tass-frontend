export interface City {
    id?: number;
    cap?: number;
    tourismTypes?: string[]; // da vedere se serve l'id in caso bisogna creare l'interfaccia tourismtypes
    region?: string;
    name?: string;
}
