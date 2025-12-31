// Type declarations for JavaScript service modules

declare module '../../services' {
  export const API: any;
  export const AuthService: any;
  export const ProjectService: any;
  export const NewsService: any;
  export const EventService: any;
  export const VolunteerService: any;
  export const DonationService: any;
  export const StoryService: any;
  export const TeamService: any;
  export const PartnerService: any;
  export const UserService: any;
  export const ContactService: any;
  export const FAQService: any;
}

declare module '../../services/adminAuthService' {
  const adminAuthService: any;
  export default adminAuthService;
}

declare module '../../services/authService' {
  const AuthService: any;
  export default AuthService;
}

declare module '../../services/donationService' {
  const donationService: any;
  export default donationService;
}

declare module '../../services/faqService' {
  const faqService: any;
  export default faqService;
}

declare module '../../services/newsService' {
  const newsService: any;
  export default newsService;
}

declare module '../../services/eventService' {
  const eventService: any;
  export default eventService;
}

declare module '../../services/projectService' {
  const projectService: any;
  export default projectService;
}

declare module '../../services/teamService' {
  const teamService: any;
  export default teamService;
}

declare module '../../services/volunteerService' {
  const volunteerService: any;
  export default volunteerService;
}

declare module '../services/adminAuthService' {
  const adminAuthService: any;
  export default adminAuthService;
}

declare module '../services/authService' {
  const AuthService: any;
  export default AuthService;
}

declare module '../pages/ImpactStats' {
  const ImpactStats: React.FC;
  export default ImpactStats;
}

declare module '../pages/LatestNewsSection' {
  const LatestNewsSection: React.FC;
  export default LatestNewsSection;
}

