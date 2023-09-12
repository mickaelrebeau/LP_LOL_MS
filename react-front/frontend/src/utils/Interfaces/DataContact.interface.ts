export interface DataContacts {
  id: number;
  pseudo: string;
  email: string;
  firstname?: string;
  lastname?: string;
  groups?: string[];
  data_add?: { [key: string]: string }[] | null;
}
