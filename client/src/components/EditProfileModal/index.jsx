/* eslint-disable react/prop-types */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import './index.css'

function EditProfileModal({ setShowModal }) {
    const [relationshipStatus, setRelationshipStatus] = useState('');
    const [school, setSchool] = useState('');
    const [work, setWork] = useState('');
    const [currentlyLearning, setCurrentlyLearning] = useState('');
    const [petPeeve, setPetPeeve] = useState('');
    const [headline, setHeadline] = useState('');
    const [website, setWebsite] = useState('');
    const [hobbies, setHobbies] = useState('');


    const showToastMessage = (errorMsg) => {
        toast.error(errorMsg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            className: 'toast-message',
            toastId: 'httpsRequired'
        });
    };

    async function updateUserInfo(e) {
        e.preventDefault();
        // check the format of website and enforce 'https://'
        const urlRegex = /^https:\/\//;
        if (!urlRegex.test(website)) {
            showToastMessage('website needs to start with \'https://\'')
            return
        }


        try {
            console.log('hi')
        } catch (err) {
            console.log('could not update user', err)
        }
    }


    return (
        <div onClick={() => setShowModal(false)} className="modal-container">
            <div onClick={(e) => e.stopPropagation()} className="modal">
                <ToastContainer />
                <h3 className="modal-title">Update Info</h3>
                <form className="update-userinfo-form" onSubmit={(e) => updateUserInfo(e)}>
                    <label htmlFor="relationshipStatus">Relationship Status</label>
                    <select value={relationshipStatus} id="relationshipStatus" onChange={(e) => setRelationshipStatus(e.target.value)} className="form-input">
                        <option>Single</option>
                        <option>Married</option>
                        <option>Partner</option>
                        <option>Dating</option>
                        <option>Yikes</option>
                    </select>

                    <div className="flex-box-sb">
                        <label htmlFor="school">School</label>
                        <p className="form-character-count">{school.length}/30</p>
                    </div>
                    <input
                        type="text"
                        value={school}
                        className="form-input"
                        id="school"
                        maxLength={30}
                        onChange={(e) => setSchool(e.target.value)}
                    />

                    <div className="flex-box-sb">
                        <label htmlFor="work">Work</label>
                        <p className="form-character-count">{work.length}/30</p>
                    </div>
                    <input
                        type="text"
                        value={work}
                        maxLength={30}
                        className="form-input"
                        id="work"
                        onChange={(e) => setWork(e.target.value)}
                    />

                    <div className="flex-box-sb">
                        <label htmlFor="currently-learning">Currently Learning</label>
                        <p className="form-character-count">{currentlyLearning.length}/20</p>
                    </div>
                    <input
                        type="text"
                        value={currentlyLearning}
                        className="form-input"
                        maxLength={20}
                        id="currently-learning"
                        onChange={(e) => setCurrentlyLearning(e.target.value)}
                    />
                    
                    <div className="flex-box-sb">
                        <label htmlFor="hobbies">Hobbies</label>
                        <p className="form-character-count">{hobbies.length}/30</p>
                    </div>
                    <input
                        type="text"
                        value={hobbies}
                        className="form-input"
                        maxLength={30}
                        id="hobbies"
                        onChange={(e) => setHobbies(e.target.value)}
                    />

                    <div className="flex-box-sb">
                        <label htmlFor="petPeeve">Pet Peeve</label>
                        <p className="form-character-count">{petPeeve.length}/28</p>
                    </div>
                    <input
                        type="text"
                        value={petPeeve}
                        className="form-input"
                        maxLength={28}
                        id="pet-peeve"
                        onChange={(e) => setPetPeeve(e.target.value)}
                    />


                    <div className="flex-box-sb">
                        <label htmlFor="headline">Headline</label>
                        <p className="form-character-count">{headline.length}/100</p>
                    </div>
                    <textarea
                        type="text"
                        value={headline}
                        className="form-input"
                        maxLength={100}
                        id="headline"
                        onChange={(e) => setHeadline(e.target.value)}
                    />

                    <label htmlFor="website">Website</label>
                    <input
                        type="text"
                        value={website}
                        className="form-input"
                        id="website"
                        placeholder="https://..."
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <button type="submit">Update</button>
                </form>

            </div>
        </div>
    )
}

export default EditProfileModal;