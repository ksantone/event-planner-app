from app import app
from models import db, Event
from datetime import datetime, timedelta

# Sample events
sample_events = [
    Event(
        title="Hired Project Manager",
        type="Hire",
        startDate=datetime(2025, 4, 25, 10, 0),
        endDate=datetime(2025, 4, 25, 11, 0)
    ),
    Event(
        title="Q2 Merger Announcement",
        type="Merger",
        startDate=datetime(2025, 5, 10, 14, 0),
        endDate=datetime(2025, 5, 10, 15, 0)
    ),
    Event(
        title="Dividends Distribution",
        type="Dividends",
        startDate=datetime(2025, 6, 1, 9, 0),
        endDate=datetime(2025, 6, 1, 10, 0)
    ),
]

with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add_all(sample_events)
    db.session.commit()
    print("Database successfully seeded with sample events.")
