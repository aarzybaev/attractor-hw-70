export interface Apicontact {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export interface Contact extends Apicontact {
  id: string;
}

export interface Apicontacts {
  [id: string]: Apicontact;
}

