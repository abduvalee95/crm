import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { upcomingEvents } from '@/lib/data/client'
import React from 'react'

const EventPage = () => {
	return (
		<div>
			{/* Ближайшие события */}
      <Card className="bg-background border-border text-card-foreground shadow-lg h-full ">
        <CardHeader>
          <CardTitle>Ближайшие события</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex item-center gap-4">
                <div className="text-muted-foreground">{event.time}</div>
                  <p className="text-card-foreground">{event.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
		</div>
	)
}

export default EventPage