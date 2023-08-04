const scheduleText = `Event Schedule \n \n Day 1: Technical Workshops\nTime: 10:00 AM - 1:00 PM\n\n10:00 AM - 10:30 AM: Registration and Welcome Address\n10:30 AM - 11:30 AM: Workshop on Artificial Intelligence\n11:30 AM - 12:30 PM: Workshop on Web Development\n12:30 PM - 1:00 PM: Q&A and Networking Session\n\nDay 2: Hackathon\nTime: 9:00 AM - 5:00 PM\n\n9:00 AM - 9:30 AM: Team Formation and Briefing\n9:30 AM - 12:00 PM: Hackathon Coding Session (Part 1)\n12:00 PM - 1:00 PM: Lunch Break\n1:00 PM - 4:00 PM: Hackathon Coding Session (Part 2)\n4:00 PM - 5:00 PM: Project Presentations and Judging\n\nDay 3: Technical Talks and Awards Ceremony\nTime: 11:00 AM - 3:00 PM\n\n11:00 AM - 12:30 PM: Technical Talks on Emerging Technologies\n12:30 PM - 1:30 PM: Lunch Break\n1:30 PM - 2:30 PM: Awards Ceremony and Prize Distribution\n2:30 PM - 3:00 PM: Closing Remarks and Networking\n\nNote: The schedule is subject to change. Please stay updated with any announcements.`;

const scheduleTyping = document.getElementById('schedule-typing');
let index = 0;

function typeSchedule() {
  if (index < scheduleText.length) {
    const currentChar = scheduleText.charAt(index);
    if (currentChar === '\n') {
      scheduleTyping.innerHTML += '<br>';
    } else {
      scheduleTyping.innerHTML += currentChar;
    }
    index++;
    setTimeout(typeSchedule, 40); // Adjust the typing speed here (lower value = faster typing)
  }
}

window.onload = function () {
  typeSchedule();
};
