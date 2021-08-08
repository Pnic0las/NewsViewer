import React, {useRef, useState }  from "react";
import Modal from "../components/Modal";

function Mag() {
    const buttonOpen = useRef(null);
    const modalElement = useRef(null);
    const [mag, setMag] = useState("");

    function addPerson(e) {
        e.preventDefault();
        console.log('Add person !!', e.target.name.value);
        modalElement.current.style.display = 'none'
        setMag(e.target.name.value)
    }

    return (
        <>
            <div>
                <button type="button" ref={buttonOpen}>Créer un magazine</button>
                <br></br><a href={'/'}>{mag}<br></br></a>
            </div>
            <div id="personModal" ref={modalElement}>
                <Modal addPerson={addPerson} buttonOpen={buttonOpen} modalElement={modalElement} />
            </div>
        </>
    );
}

export default Mag;