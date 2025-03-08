const base_url = "https://notes-api.dicoding.dev/v2";

// Get Data Non Archive
export const getDataNonArchive = async () => {
    try{
        const response = await fetch(`${base_url}/notes`);
        const responseJson = await response.json(); // Result

        if(!response.ok) {
            console.warn(responseJson.message);
        } else {
            console.log("Data Non Archive: ", responseJson.data)
            return responseJson.data
        }

    } catch (err) {
        showResponseMessage("Gagal Mengambil Notes Non Archive", err);
    }
}

// Get Data Archive
export const getDataArchive = async () => {
    try {
        const response = await fetch(`${base_url}/notes/archived`);
        const responseJson = await response.json();

        if(!response.ok) {
            console.warn(responseJson.message)
        } else {
            console.log("Data Archive: ",responseJson.data)
            return responseJson.data
        }
    } catch (err) {
        showResponseMessage("Gagal Mengambil Notes Archive", err)
    }
}

// Create Note
export const createNote = async (title, body) => {
    try{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body })
        }

        const response = await fetch(`${base_url}/notes`, options)
        const responseJson = await response.json()

        if(!response.ok) {
            showResponseMessage(responseJson.message)
        } else {
            document.dispatchEvent(new CustomEvent('note-added'))
            return responseJson.data
        }
    } catch (err) {
        showResponseMessage("Gagal Membuat Catatan", err)
    }
}

// Archive Note
export const archiveNote = async (noteId) => {
    try{
        const response = await fetch(`${base_url}/notes/${noteId}/archive`, {method: 'POST'});
        const responseJson = await response.json()

        if(!response.ok) {
            showResponseMessage(responseJson.message)
        } else {
            document.dispatchEvent(new CustomEvent('note-updated'))
            return responseJson.data
        }

    } catch (err) {
        showResponseMessage("Gagal Archive Note", err)
    }
}

// Unarchive Note
export const unArchiveNote = async (noteId) => {
    try {
        const response = await fetch(`${base_url}/notes/${noteId}/unarchive`, { method: 'POST' })
        const responseJson = await response.json();

        if(!response.ok) throw Error(responseJson.message)

        document.dispatchEvent(new CustomEvent('note-updated'))
    } catch (err) {
        showResponseMessage("Gagal Unarchive Data", err)
    }
}

// Delete Note
export const deleteNote = async (noteId) => {
    try{
        const response = await fetch(`${base_url}/notes/${noteId}`, { method: 'DELETE' });
        const responseJson = await response.json();

        if(!response.ok) throw Error(responseJson.message)
        
        document.dispatchEvent(new CustomEvent('note-updated'))
    } catch (err) {
        showResponseMessage("Gagal Delete Data", err)
    }
}

// Response Message
const showResponseMessage = (message = "cek your connection") => {
    console.warn(message)
}
