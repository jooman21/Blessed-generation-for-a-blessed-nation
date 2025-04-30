import React, { useState, useEffect } from 'react';
import newsService from '../../services/newsService';
import eventService from '../../services/eventService';
// Assuming combined service or separate
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Trash2, Edit, PlusCircle } from 'lucide-react';

// Interfaces
interface News {
  id: string;
  title: string;
  content: string;
  publishedDate: string;
  createdAt: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  createdAt: string;
}

// Validation Schemas
const NewsSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  publishedDate: Yup.date().required('Published date is required'),
});

const EventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date().required('Event date is required'),
  location: Yup.string().required('Location is required'),
});

const ManageNewsEventsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingNews, setLoadingNews] = useState<boolean>(true);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState<boolean>(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState<boolean>(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Fetch Data
  const fetchNews = async () => {
    setLoadingNews(true);
    setError(null);
    try {
      // Assuming pagination exists or fetching all for simplicity
      const response = await NewsService.getAllNews({}); 
      setNewsItems(response.news || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news.');
      console.error("Error fetching news:", err);
    }
    setLoadingNews(false);
  };

  const fetchEvents = async () => {
    setLoadingEvents(true);
    setError(null);
    try {
      // Assuming pagination exists or fetching all for simplicity
      const response = await EventService.getAllEvents({});
      setEvents(response.events || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch events.');
      console.error("Error fetching events:", err);
    }
    setLoadingEvents(false);
  };

  useEffect(() => {
    fetchNews();
    fetchEvents();
  }, []);

  // Formik Setup (News)
  const newsFormik = useFormik({
    initialValues: {
      id: '',
      title: '',
      content: '',
      publishedDate: '',
    },
    validationSchema: NewsSchema,
    onSubmit: async (values) => {
      try {
        const newsData = {
          ...values,
          publishedDate: new Date(values.publishedDate).toISOString(),
        };
        if (editingNews) {
          await NewsService.updateNews(editingNews.id, newsData);
          alert('News item updated successfully!');
        } else {
          await NewsService.createNews(newsData);
          alert('News item created successfully!');
        }
        setIsNewsDialogOpen(false);
        setEditingNews(null);
        fetchNews();
        newsFormik.resetForm();
      } catch (err: any) {
        console.error("Error saving news:", err);
        alert(`Error saving news: ${err.message || 'Unknown error'}`);
      }
    },
  });

  // Formik Setup (Event)
  const eventFormik = useFormik({
    initialValues: {
      id: '',
      title: '',
      description: '',
      date: '',
      location: '',
    },
    validationSchema: EventSchema,
    onSubmit: async (values) => {
      try {
        const eventData = {
          ...values,
          date: new Date(values.date).toISOString(),
        };
        if (editingEvent) {
          await EventService.updateEvent(editingEvent.id, eventData);
          alert('Event updated successfully!');
        } else {
          await EventService.createEvent(eventData);
          alert('Event created successfully!');
        }
        setIsEventDialogOpen(false);
        setEditingEvent(null);
        fetchEvents();
        eventFormik.resetForm();
      } catch (err: any) {
        console.error("Error saving event:", err);
        alert(`Error saving event: ${err.message || 'Unknown error'}`);
      }
    },
  });

  // News Handlers
  const handleAddNews = () => {
    setEditingNews(null);
    newsFormik.resetForm();
    setIsNewsDialogOpen(true);
  };

  const handleEditNews = (news: News) => {
    setEditingNews(news);
    newsFormik.setValues({
      id: news.id,
      title: news.title,
      content: news.content,
      publishedDate: news.publishedDate ? new Date(news.publishedDate).toISOString().split('T')[0] : '',
    });
    setIsNewsDialogOpen(true);
  };

  const handleDeleteNews = async (newsId: string) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await NewsService.deleteNews(newsId);
        alert('News item deleted successfully.');
        fetchNews();
      } catch (err: any) {
        console.error("Error deleting news:", err);
        alert(`Error deleting news: ${err.message || 'Unknown error'}`);
      }
    }
  };

  // Event Handlers
  const handleAddEvent = () => {
    setEditingEvent(null);
    eventFormik.resetForm();
    setIsEventDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    eventFormik.setValues({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
      location: event.location,
    });
    setIsEventDialogOpen(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await EventService.deleteEvent(eventId);
        alert('Event deleted successfully.');
        fetchEvents();
      } catch (err: any) {
        console.error("Error deleting event:", err);
        alert(`Error deleting event: ${err.message || 'Unknown error'}`);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage News & Events</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      {/* News Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">News</h3>
          <Button onClick={handleAddNews} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Add News Item
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          {loadingNews && <p>Loading news...</p>}
          {!loadingNews && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsItems.length > 0 ? (
                  newsItems.map((news) => (
                    <TableRow key={news.id}>
                      <TableCell>{news.title}</TableCell>
                      <TableCell>{new Date(news.publishedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditNews(news)} title="Edit News">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteNews(news.id)} title="Delete News">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No news items found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Events Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Events</h3>
          <Button onClick={handleAddEvent} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          {loadingEvents && <p>Loading events...</p>}
          {!loadingEvents && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length > 0 ? (
                  events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)} title="Edit Event">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)} title="Delete Event">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No events found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* News Form Dialog */}
      <Dialog open={isNewsDialogOpen} onOpenChange={setIsNewsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingNews ? 'Edit News Item' : 'Add New News Item'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={newsFormik.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newsTitle" className="text-right">Title</Label>
                <Input id="newsTitle" name="title" value={newsFormik.values.title} onChange={newsFormik.handleChange} onBlur={newsFormik.handleBlur} className="col-span-3" />
              </div>
              {newsFormik.touched.title && newsFormik.errors.title ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{newsFormik.errors.title}</div> : null}
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="newsContent" className="text-right pt-2">Content</Label>
                <Textarea id="newsContent" name="content" value={newsFormik.values.content} onChange={newsFormik.handleChange} onBlur={newsFormik.handleBlur} className="col-span-3" rows={5} />
              </div>
              {newsFormik.touched.content && newsFormik.errors.content ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{newsFormik.errors.content}</div> : null}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publishedDate" className="text-right">Published Date</Label>
                <Input id="publishedDate" name="publishedDate" type="date" value={newsFormik.values.publishedDate} onChange={newsFormik.handleChange} onBlur={newsFormik.handleBlur} className="col-span-3" />
              </div>
              {newsFormik.touched.publishedDate && newsFormik.errors.publishedDate ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{newsFormik.errors.publishedDate}</div> : null}
            </div>
            <DialogFooter>
               <DialogClose asChild>
                 <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={newsFormik.isSubmitting || !newsFormik.isValid}>
                {newsFormik.isSubmitting ? 'Saving...' : 'Save News Item'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Event Form Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={eventFormik.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="eventTitle" className="text-right">Title</Label>
                <Input id="eventTitle" name="title" value={eventFormik.values.title} onChange={eventFormik.handleChange} onBlur={eventFormik.handleBlur} className="col-span-3" />
              </div>
              {eventFormik.touched.title && eventFormik.errors.title ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{eventFormik.errors.title}</div> : null}
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="eventDescription" className="text-right pt-2">Description</Label>
                <Textarea id="eventDescription" name="description" value={eventFormik.values.description} onChange={eventFormik.handleChange} onBlur={eventFormik.handleBlur} className="col-span-3" rows={4} />
              </div>
              {eventFormik.touched.description && eventFormik.errors.description ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{eventFormik.errors.description}</div> : null}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="eventDate" className="text-right">Date</Label>
                <Input id="eventDate" name="date" type="date" value={eventFormik.values.date} onChange={eventFormik.handleChange} onBlur={eventFormik.handleBlur} className="col-span-3" />
              </div>
              {eventFormik.touched.date && eventFormik.errors.date ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{eventFormik.errors.date}</div> : null}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="eventLocation" className="text-right">Location</Label>
                <Input id="eventLocation" name="location" value={eventFormik.values.location} onChange={eventFormik.handleChange} onBlur={eventFormik.handleBlur} className="col-span-3" />
              </div>
              {eventFormik.touched.location && eventFormik.errors.location ? <div className="col-start-2 col-span-3 text-red-500 text-sm">{eventFormik.errors.location}</div> : null}
            </div>
            <DialogFooter>
               <DialogClose asChild>
                 <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={eventFormik.isSubmitting || !eventFormik.isValid}>
                {eventFormik.isSubmitting ? 'Saving...' : 'Save Event'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ManageNewsEventsPage;
