import React, {useEffect }  from "react";

export default function Modal(props) {
    function close() {
        props.modalElement.current.style.display = 'none';
    }

    function open() {
        props.modalElement.current.style.display = 'block';
    }

    useEffect(() => {
        props.buttonOpen.current.onclick = open;
    });

return (
    <div>
        <h1>Nouveau magazine</h1>
        <form id='personForm' onSubmit={e => props.addPerson(e)}>
            <p>Nom<br/><input placeholder="Entrer un nom" name="name" required="required"/></p>
            <p>Ajouter un lien<br/><input placeholder="Collez votre lien ici" name="link"/></p>
            <div id="buttons">
                <button type="submit">Créer</button>
                <button type="button" onClick={close}>Annuler</button>
            </div>
        </form>
    </div>
);
}