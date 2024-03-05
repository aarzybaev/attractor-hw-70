import {useNavigate, useParams} from 'react-router-dom';
import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {useSelector} from 'react-redux';
import {
  selectCreateLoading,
  selectEditLoading,
  selectFetchOneLoading,
  selectOneContact
} from '../../store/contactSlice';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';
import {createContact, editContact, fetchOne} from '../../store/contactThunks';
import Spinner from '../Spinner/Spinner';

const ContactForm = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    photo: ''
  });

  const dispatch = useAppDispatch();
  const createLoading = useSelector(selectCreateLoading);
  const fetchOneLoading = useSelector(selectFetchOneLoading);
  const editLoading = useSelector(selectEditLoading);
  const oneContact = useSelector(selectOneContact);
  const navigate = useNavigate();

  const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAOVBMVEX///+hoaGampqdnZ2srKy0tLSoqKjZ2dnq6ur39/fAwMDt7e3g4OC7u7vw8PD6+vqTk5PS0tLIyMhAQKZNAAACjElEQVR4nO3a2XKqQBRAUXsCZGz4/4+9EhCQsS50FYeqvV41hm17Gkh8vQAAAAAAAAAAAAAAAAAAAAAAAAAACCIvXFB1dWNMo01I2iY3xqRGGR2KUcrmt8aYOksCyZ2+OUaH+/VlQUwwxGwRFJM3aXNtYxUTk7hIfRTvCy8mJSZxpm1Rxl2okRKTdi1K6QsXJEJiEvuNUfb80giJiaNvi9Ll6RcTElOrMSY7/WJCYnI7xJjHr0zpvjNzZTsTEjN+zvzueTPVqtl+VErM5y5Nt+vi472dufisnyk2HxYT8/rcjHjtdgcm9n+LV289Lifm9aoOTpel7z+KW/udpJgjw4YXbTzhQTGpHnbvjbF5Tkzu1Wh9bJ4TM21RanWjeExMZH5iVsfmKTHjwPTSlSc9JCbxsxZl4uWzHhKzaFFGLa/hZMZks9PibGA6bvFjImOs99H0fa/nA9NZXHJKjGlvoY0ar22WA9Ob/6TAmObvQLUbatbXpd2fZ2cbeTFxf6T+e5Z3awPTbQKzyxpxMeXwpw3fve/11odsOTbiYsZ16MYm22sx6ue+VFpMMzlUXVST6/71Gju9BxIWk6vpgPh4Z2D6munYyIqp7O+xm+agRf3cDciKKebHvrkrj73RODaiYurDQ1+rGU9IkmKS1Uuw45rhbkBQzPto2LdE37sBQTHpyZbP/tyPjZyYyX81/rumHxsxMYk9uzCtRlRMdXZguqXpxkZKTHN8xLs1LpMTE5/blSc17XWcjJjEHp/qD2LasZER00T2qsglMmKqMguglBATv0NJbo9RLg2liMy9MTrgdzS1uTemjsIqzn+L4Loqj4M6//UOAAAAAAAAAAAAAAAAAAAAAAAAAMBl/wCSoC7OdsS5KwAAAABJRU5ErkJggg==";
  const { id} = useParams();



  const getOneContact = useCallback(async () => {
      if (id) {
        await dispatch(fetchOne(id));
        if (oneContact) {
          setContactForm({...oneContact});
        }
      } else {
        setContactForm({
          name: '',
          phone: '',
          email: '',
          photo: ''
        });
      }

    },[dispatch, navigate]);

    useEffect(() => {
      void getOneContact();
    }, [getOneContact]);


  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const formHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await dispatch(editContact({...contactForm, id}));
    } else {
      await dispatch(createContact(contactForm));
    }
  };

  const backToContacts = ()=> {
    setContactForm({
      name: '',
      phone: '',
      email: '',
      photo: ''
    });
    navigate('/');
  };

  let content = <Spinner />;

  if (!fetchOneLoading) {
    content = (
      <form className="mt-3 ms-3" onSubmit={formHandle}>
        <div className="row align-items-center">
          <div className="col-auto">
            <label htmlFor="name" className="col-form-label">Name</label>
          </div>
          <div className="col-3">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={contactForm.name}
              onChange={formChange}
              required
            />
          </div>
        </div>
        <div className="row align-items-center mt-2">
          <div className="col-auto">
            <label htmlFor="phone" className="col-form-label">Phone</label>
          </div>
          <div className="col-3">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={contactForm.phone}
              onChange={formChange}
              required
            />
          </div>
        </div>
        <div className="row align-items-center mt-2">
          <div className="col-auto">
            <label htmlFor="email" className="col-form-label">E-mail</label>
          </div>
          <div className="col-3">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={contactForm.email}
              onChange={formChange}
              required
            />
          </div>
        </div>
        <div className="row align-items-center mt-2">
          <div className="col-auto">
            <label htmlFor="photo" className="col-form-label">Photo</label>
          </div>
          <div className="col-3">
            <input
              type="text"
              id="photo"
              name="photo"
              className="form-control"
              value={contactForm.photo}
              onChange={formChange}
              required
            />
          </div>
        </div>
        <div className="row align-items-center mt-2">
          <div className="col-auto">
            <label htmlFor="photo" className="col-form-label">Photo preview</label>
          </div>
          <div className="col-3">
            <img src={!contactForm.photo ? img: contactForm.photo}
                 alt="image placeholder" style={{width: "200px"}}/>
          </div>
        </div>

        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={createLoading || editLoading}
          >
            {createLoading && <ButtonSpinner/> || editLoading && <ButtonSpinner/>}
            Save
          </button>
          <button type="button" className="btn btn-secondary btn-sm ms-2" onClick={backToContacts}>Back to contacts</button>
        </div>
      </form>
    );
  }

  return content;
};

export default ContactForm;