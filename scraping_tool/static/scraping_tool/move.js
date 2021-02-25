
const scheduled_items = document.getElementById('scheduled-items');
const unscheduled_items = document.getElementById('unscheduled-items');

// Emphasize "Scraping"
const emphasizeScraping = function() {
    if (unscheduled_items.childElementCount == 0) {
        // Assign style to 'Scraping' in Nav
        document.getElementById('scraping').classList.add('scraping-emphasis');

        // Create the sentence and Asign style to the lead sentence
        const first_lead = document.getElementById('first-lead');
        first_lead.innerHTML = 'Do <a>Scraping</a> to start.';
        const first_lead_scraping = first_lead.getElementsByTagName('a')[0];
        first_lead_scraping.classList.add('scraping-emphasis a-style');
        const url = document.getElementById('scraping').href
        first_lead_scraping.href = url;

        // Delete subtitle
        const subtitles = document.getElementsByClassName('subtitle')
        Array.from(subtitles).forEach((subtitle) => {
            subtitle.style.display = 'none';
        })

    } else {
        document.getElementById('scraping').classList.remove('scraping-emphasis');
    }
}

// Add "No Schedules"
const displayNoSchedules = function() {
    if (scheduled_items.childElementCount > 0) {    
        document.getElementById('null-warning').style.display = 'none';
    } else {
        document.getElementById('null-warning').style.display = 'block';
        emphasizeScraping();
    }
}
window.onload = function(){
    displayNoSchedules();
}


// Filter
const search = document.querySelector('.search input');

const filterMails = (term, mails) => {

    Array.from(mails.children)
        // Filtering condtions
        .filter((mail) => !mail.textContent.toLowerCase().includes(term))
        .forEach((mail) => mail.classList.add('filtered'));

    Array.from(mails.children)
        .filter((mail) => mail.textContent.toLowerCase().includes(term))
        .forEach((mail) => mail.classList.remove('filtered'));

};

search.addEventListener('keyup', () => {
    // Remove spaces and convert to lower cases
    const term = search.value.trim().toLowerCase();
    filterMails(term, scheduled_items);
    filterMails(term, unscheduled_items);
});

// Delete:Ajax (click the delete icon or click the delete nav)
$('.delete-box').click(function(event) {
    event.preventDefault();
    const delete_url = $(this).attr("href");
    $.ajax(
        {
            method: "GET",
            url: delete_url,
            data: {}
        }
    )
    // success
    .done( (item_id) => {
        const child = document.getElementById(item_id);
        child.parentNode.removeChild(child);
        displayNoSchedules();
    })
    // fail
    .fail( () => {
        alert('Deletion Failed')
    })
})

// Delete_All(Reset):Ajax
const removeChildren = function(parent) {
    Array.from(parent.chidren)
        .forEach((child) => {
            parent.removeChild(child);
        })
}

$('.delete-all-box').click(function(event) {
    event.preventDefault();
    if (window.confirm('Are you sure you want to Reset?')) {
        const url = $(this).attr("href");
        $.ajax(
            {
                method: "GET",
                url: url,
                data: {}
            }
        )
        // success
        .done( (message) => {
            const scheduled_parent = document.getElementById('scheduled_items')
            const unscheduled_parent = document.getElementById('unscheduled_items')
            removeChildren(scheduled_parent);
            removeChildren(unscheduled_parent);
            window.alert(message);
            displayNoSchedules();
        })
        // fail
        .fail( () => {
            alert('Resetting Fails')
        })
    } else {
        ;
    }
})


// Format Date
// const scheduled_date = document.querySelector('.scheduled-date')
// const unscheduled_date = document.querySelector('.unscheduled-date')
// function formatScheduledDate (scheduled_date) {
//     Array.from(scheduled_date)
//         .forEach(function(date) {
//             const pos = date.textContent.indexOf(':');
//             const format_date = formatDate(date.substr(0, pos)) + date.substr(pos)
//             date.textContent = format_date
//         })
// };
// const formatDate = function(date) {
//     const day = new Date(date)
//     const y = day.getFullYear()
//     const m = day.getMonth() + 1
//     const d = day.getDate()
//     const format_date = m + '/' + d + '/' + y
//     return format_date
// };