import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import React from 'react'

const EventPage = () => {
	return (
		<div>
			{/* Ближайшие события */}
      <Card className="bg-[#1B1E23] border-gray-800 text-white shadow-lg">
        <CardHeader>
          <CardTitle>Ближайшие события</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex">
                <div className="font-semibold text-gray-300 w-16">{event.time}</div>
                <div className="pl-4 border-l-2 border-blue-500">
                  <p className="font-semibold text-white">{event.title}</p>
                  <p className="text-sm text-gray-400">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

		</div>
	)
}

export default EventPage