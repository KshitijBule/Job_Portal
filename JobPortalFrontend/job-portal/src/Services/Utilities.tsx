const formatDate = (dateString:string)=>{
  const date = new Date(dateString);
  const options ={year:'numeric' as const, month:'short' as const}
  return date.toLocaleString('en-US',options);
}

const timeAgo = (time: string | number | Date): string => {
  const now = new Date();
  const postDate = new Date(time);

  const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30);
  return `${months} month${months !== 1 ? "s" : ""} ago`;
};

export {formatDate,timeAgo};