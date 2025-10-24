import Header from '@/widgets/header/ui/Header'
import React from 'react'

export default function EmployeePage() {
	return (
		<div className="flex-1 min-h-screen p-4 space-y-6 shadow-lg">
			<Header pageType="employees"/>
		</div>
	)
}
