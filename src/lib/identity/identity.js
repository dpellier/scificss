
class Identity extends HTMLElement {
    createdCallback() {
        console.log('created');
        this.innerHTML = '<p>Identity</p>';
    }
}

export default Identity;
