import { useState } from 'react'
import TopCards from './TopCards'
import BarChart from './BarChart'
import Members from './Members'
import ListBox from './ListBox'
import React from 'react'
import player from '../models/player'
import team from '../models/team'
import { rank } from '../services/teamService'

interface chartData {
	labels: string[]
	datasets: dataset[]
}

interface dataset {
	label: string
	data: number[]
	borderColor: string
	backgroundColor: string
}

interface dashboardProps {
	data: team[]
}

export default function DashBoard({ data }: dashboardProps) {
	const ranked = rank(data)
	const [selected, setSelected] = useState(ranked[0])
	const { members } = selected
	const labels = members.map((member: player) => member.name)
	const KDAs = members.map((member: player) => member.KDA)
	const CSMPs = members.map((member: player) => member.CSPM)
	const DMGPMs = members.map((member: player) => member.DMGPM)

	const [chartData, setChartData] = useState<chartData>({
		labels: labels,
		datasets: [
			{
				label: 'KDA',
				data: KDAs,
				borderColor: '#2887F5',
				backgroundColor: '#2887F5',
			},
			{
				label: 'CSMP',
				data: CSMPs,
				borderColor: '#ff514d',
				backgroundColor: '#ff514d',
			},
			{
				label: 'DMGPM (x100)',
				data: DMGPMs,
				borderColor: '#ED009C',
				backgroundColor: '#ED009C',
			},
		],
	})

	const handleSelected = (selected: team) => {
		const { members } = selected
		const labels = members.map((member: player) => member.name)
		const KDAs = members.map((member: player) => member.KDA)
		const CSMPs = members.map((member: player) => member.CSPM)
		const DMGPMs = members.map((member: player) => member.DMGPM)
		setSelected(selected)
		setChartData({
			labels: labels,
			datasets: [
				{
					label: 'KDA',
					data: KDAs,
					borderColor: '#2887F5',
					backgroundColor: '#2887F5',
				},
				{
					label: 'CSMP',
					data: CSMPs,
					borderColor: '#ff514d',
					backgroundColor: '#ff514d',
				},
				{
					label: 'DMGPM (x100)',
					data: DMGPMs,
					borderColor: '#ED009C',
					backgroundColor: '#ED009C',
				},
			],
		})
	}

	return (
		<div className='p-4'>
			<ListBox list={data} selected={selected} setSelected={handleSelected} />
			<TopCards team={selected} />
			<div className='pt-4 pr-4 grid md:grid-cols-3 grid-cols-1 gap-4 '>
				<BarChart chartData={chartData} />
				<Members teamData={selected} />
			</div>
		</div>
	)
}
