import { h, Fragment } from 'preact';
import Timer from './Timer';
import { useMemo, useState } from 'preact/hooks';
import Dropdown from './Dropdown';
import { DateComponents, formatDate, pd } from '../DateFormat';

function App () {
	
	const dateFormats: ((components: DateComponents) => string)[] = useMemo(() => [
		c => `${c.month}/${c.day}/${c.year.substring(2,4)} ${c.hr12}:${pd(c.minute)} ${c.ampm}`,
		c => `${c.year}-${pd(c.month)}-${pd(c.day)} ${pd(c.hour)}:${pd(c.minute)}`,
	], []);
	
	const [chosenFormat, setChosenFormat] = useState(0);

	const timeOptions = useMemo(() => [
		['Start of School', new Date('2023-08-14T08:30:00')],
		['2024 Kickoff', new Date('2024-01-13T09:00:00')],
		['Socal Showdown', new Date('2023-10-06T08:00:00')],
	] as [name: string, start: Date][], []);
	
	const [chosenTime, setChosenTime] = useState(0);
	
	const targetTime = useMemo(() => timeOptions[chosenTime], [timeOptions, chosenTime]);
    
	return <main>
		<div class="center">
			<Timer targetTime={targetTime[1]} />
			<span class="subtitle">until</span>
			<Dropdown options={timeOptions} value={chosenTime} onInput={setChosenTime}>{(option) => (
				// <div class="option">
				// 	<div>{option[0]}</div>
				// 	<div>{formatDate(option[1], dateFormats[chosenFormat])}</div>
				// </div>
				<>
					{option[0]}{' '}
					<span class="fade">{formatDate(option[1], dateFormats[chosenFormat])}</span>
				</>
			)}</Dropdown>
		</div>
		<div class="corner">
			<Dropdown options={dateFormats} value={chosenFormat} onInput={setChosenFormat}>{(option) => (
				option({
					year: 'YYYY',
					month: 'MM',
					day: 'DD',
					hour: 'hh',
					hr12: 'hh',
					minute: 'mm',
					ampm: 'A/P'
				})
			)}</Dropdown>
		</div>
	</main>;
}

export default App;
