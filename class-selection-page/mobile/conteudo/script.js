


// ==============================================================================

function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("InputBox");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    
    /* Alert the copied text */
    document.getElementById('copyPaste').innerText = copyPaste.style.backgroundColor = '#089944', 
    copyPaste.innerText = 'content_paste', 
    copyPaste.style.color = '#FFFFFF',
    copyPaste.style.border = '1px solid #FFFDFD'
  }
 