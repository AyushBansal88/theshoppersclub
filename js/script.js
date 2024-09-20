function onscroll_header() {
  if (window.scrollY > 200) {
    header.classList.add('scroll_header');
	banner.classList.add('scroll_header_padding');
  } else {
    header.classList.remove('scroll_header');
	banner.classList.remove('scroll_header_padding');
  }
}
var header = document.querySelector('header');
var banner = document.querySelector('.banner_section')
window.addEventListener("scroll", onscroll_header);
window.addEventListener("load", onscroll_header);


class CountdownTimer {
  constructor({ selector, targetDate }) {
	this.selector = selector;
	this.targetDate = targetDate;
	this.refs = {
	  days: document.querySelector(`${this.selector} [data-value="days"]`),
	  hours: document.querySelector(`${this.selector} [data-value="hours"]`),
	  mins: document.querySelector(`${this.selector} [data-value="minutes"]`),
	  secs: document.querySelector(`${this.selector} [data-value="seconds"]`),
	};
  }

  getTimeRemaining(endtime) {
	const total = Date.parse(endtime) - Date.parse(new Date());
	// console.dirxml(new Date())
	const days = Math.floor(total / (1000 * 60 * 60 * 24));
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
	const mins = Math.floor((total / 1000 / 60) % 60);
	const secs = Math.floor((total / 1000) % 60);
	return {days,hours,mins,secs};
  }

  updateTimer({ days, hours, mins, secs }) {
	if(days<0){
		this.refs.days.textContent = 0 + 'D';
	}
	else{
    	this.refs.days.textContent = days + 'D';
	}
	if(hours<0){
		this.refs.hours.textContent = 0 + 'H'
	}
	else{
		this.refs.hours.textContent = hours + 'H';
	}
	if(mins<0){
		this.refs.mins.textContent = 0 + 'M'
	}
	else{
		this.refs.mins.textContent = mins + 'M';
	}
	if(secs<0){
		this.refs.secs.textContent = 0 +'S'
	}
	else{
		this.refs.secs.textContent = secs + 'S';
	}
  }


  startTimer() {
	const timer = this.getTimeRemaining(this.targetDate);
	this.updateTimer(timer);
	setInterval(() => {
	  const timer = this.getTimeRemaining(this.targetDate);
	  this.updateTimer(timer);
	//   console.log('called'+timer);
	// console.dir(timer)
	// console.info(timer)
	// console.error(timer)
	// console.debug(timer)
	}, 1000);
  }
}

const timer1 = new CountdownTimer({
  selector: "#clock1",
  targetDate: new Date("September, 20 2024 19:00:00"),
});
  
timer1.startTimer();