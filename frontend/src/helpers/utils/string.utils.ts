import moment from 'moment';

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFormattedDateTime(str: string) {
  return moment(str).format('MMM DD, yyyy @ HH:mm:ss');
}
