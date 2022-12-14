const id = parseInt(window.location.href.split('/').at(-1).split('?')[0]);
const modifyButton = window.document.getElementById('modifyButton');
const deleteButton = window.document.getElementById('deleteButton');

deleteButton.addEventListener('click', () => {
    if (!confirm('글을 삭제 하시겠습니까?')) {
        return;
    }
    cover.show('글을 삭제하고 있습니다.\n\n잠시만 기다려 주세요.');
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', window.location.href);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            cover.hide();
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseJson = JSON.parse(xhr.responseText);
                switch (responseJson['result']) {
                    case 'success':
                        alert('글을 성공적으로 삭제하였습니다.');
                        window.location.href = '../qna';
                        break;
                    case 'k':
                        alert('자신의 글만 삭제 하실수 있습니다.');
                        break;
                    default:
                        alert('알 수 없는 이유로 글을 삭제하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send();
});

modifyButton.addEventListener('click', () => {
    window.location.href = `../modify/${id}`;
});