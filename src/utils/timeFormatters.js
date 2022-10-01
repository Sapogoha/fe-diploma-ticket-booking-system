const formatter = (value) => {
   const hours = Math.floor(value / 60);
   const minutes = value % 60;
   return `${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(-2)}`;
};

const datetimeToTime = (value) => {
   const date = new Date(value * 1000);
   //  const year = date.getFullYear();
   //  const month = date.getMonth();
   //  const day = date.getDate();
   const hrs = date.getHours();
   const mins = date.getMinutes();

   return `${`0${hrs}`.slice(-2)}:${`0${mins}`.slice(-2)}`;
};

const secsToTime = (value) => {
   const hrs = Math.floor(value / (60 * 60));
   const mins = Math.floor((value - hrs * (60 * 60)) / 60);

   return `${`${hrs}`}:${`0${mins}`.slice(-2)}`;
};

export { formatter, datetimeToTime, secsToTime };
