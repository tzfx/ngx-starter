
import { Moment, isMoment, utc } from 'moment';

export class UtcDateUtils {

	private static defaultFormat: string = 'YYYY-MM-DD HH:mm:ss[Z]';

	static format(value: string | number | Moment, format?: string): string {
		if (null != value) {
			let momentDate;
			if (isMoment(value)) {
				momentDate = value;
			}
			else {

				momentDate = utc(value);
				if (!momentDate.isValid()) {
					// converts a string of milliseconds into a number
					value = +value;
					momentDate = utc(value);
				}

				momentDate = utc(value);
			}

			if (momentDate.isValid()) {
				return momentDate.utc().format((null != format) ? format : UtcDateUtils.defaultFormat);
			}
		}

		return '-';
	}
}
