import {useAppDispatch} from '../../app/hooks';
import {useSelector} from 'react-redux';
import {selectContacts, selectFetchAllLoading, selectRemoveLoading} from '../../store/contactSlice';
import {useEffect, useState} from 'react';
import {fetchAll, removeContact} from '../../store/contactThunks';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import {useNavigate} from 'react-router-dom';
import ButtonSpinner from '../../components/ButtonSpinner/ButtonSpinner';

const Contacts = () => {
  const [showModal, setShowModal] = useState({
    id: '',
    status: false
  });
  const dispatch = useAppDispatch();
  const contacts = useSelector(selectContacts);
  const fetchLoading = useSelector(selectFetchAllLoading);
  const removeLoading = useSelector(selectRemoveLoading);
  const navigate = useNavigate();

  useEffect( () => {
     dispatch(fetchAll());
  }, [dispatch]);

  const cancel = () => setShowModal(prevState => ({...prevState, status: false}));
  const removeHandle = async (id: string) => {
    await dispatch(removeContact(id));
    await dispatch(fetchAll());
    cancel();
  };

  const getContactInfo = () => {
    const index = contacts.findIndex(item => item.id === showModal.id);
    if (index !== -1) {
    const contact = contacts[index];
    return (
      <div className="d-flex gap-3">
        <div><img src={contact.photo} alt={contact.name} style={{width: "200px"}}/></div>
        <div className="d-flex flex-column gap-3">
          <h3>{contact.name}</h3>
          <a href={"tel:" + contact.phone}>{contact.phone}</a>
          <a href={"mailto:" + contact.email}>{contact.email}</a>
        </div>
      </div>
    );
    }
  };

  let content = <Spinner/>;
  const modal = (
    <Modal
      show={showModal.status}
      title="Contact info"
      onClose={cancel}
    >
      <div className="modal-body">
        {getContactInfo()}
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/new-contact/' + showModal.id)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => removeHandle(showModal.id)}
          disabled={removeLoading}
        >
          Delete
          {removeLoading && <ButtonSpinner />}
        </button>
      </div>
    </Modal>
  );

  if (!fetchLoading) {
    content = (
      <div>
        {contacts.map(contact => (
          <div
            key={contact.id}
            className="d-flex align-items-center gap-3 mt-2"
            onClick={() => setShowModal({id: contact.id, status: true})}
          >
            <div>
              <img src={contact.photo} alt={contact.name} style={{width: "200px"}} />
            </div>
            <span className="fw-bold">{contact.name}</span>
          </div>
        ))}
        {modal}
      </div>
    );
  }

  return content;
};

export default Contacts;