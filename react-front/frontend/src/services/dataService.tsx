import contacts from '../assets/DataMock/contacts.json';
import requestContact from '../assets/DataMock/requestContact.json';
import requestData from '../assets/DataMock/requestData.json';
import contactBdd from '../assets/DataMock/contactBdd.json'


interface DataContacts {
    id: number;
    pseudo: string;
    email: string;
}

interface DataRequest {
    id: number;
    pseudo: string;
    email: string;
    request: string;
}

class Data {

    getDataContacts = (): DataContacts[] => {
        return contacts as DataContacts[];
    };

    getcontact(id: string): DataContacts | null {
        const contact = contacts.find((current) => String(current.id) === id);
        return contact || null;
    }

    getRequestContact = (): DataContacts[] => {
        return requestContact as DataContacts[];
    };

    getRequestData = (): DataRequest[] => {
        return requestData as DataRequest[];
    };
    
    getSearchData = (): DataContacts[] => {
        return contactBdd as DataContacts[];
    }
}

export default Data;