import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { upcomingEvents } from '@/lib/data/client'
import React from 'react'

const EventPage = () => {
	return (
		<div>
			{/* Ближайшие события */}
      <Card className="bg-black border-gray-800 text-white shadow-lg h-full ">
        <CardHeader>
          <CardTitle>Ближайшие события</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex item-center gap-4">
                <div className="text-gray-300">{event.time}</div>
                  <p className="text-white">{event.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
		</div>
	)
}

export default EventPage