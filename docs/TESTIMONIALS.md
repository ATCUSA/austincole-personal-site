# How to Add Testimonials

## Getting Testimonials

### Who to Ask:
- **Professional colleagues** from Latah County
- **Supervisors** or team members
- **ARES and emergency management** contacts
- **Fire department colleagues** from Genesee FD
- **ITDRC volunteers** you've worked with
- **CommUnity NexUs** and DSARC members
- **Community members** who know your work
- **Friends and family** who can speak to your character

### How to Ask:
1. **Reach out personally** via email, LinkedIn, or in person
2. **Be specific** about what you'd like them to highlight:
   - Technical skills and leadership (professional)
   - Community service and dedication (volunteer work)
   - Character and values (personal)
3. **Keep it brief** - ask for 2-3 sentences
4. **Give examples** of what you're looking for

### Sample Request:
> Hi [Name],
> 
> I'm updating my personal website and would love to include a brief testimonial about our work together. Would you be willing to share 2-3 sentences about [specific area - technical work/emergency management/community service]?
> 
> Something highlighting [specific skill/quality] would be perfect.
> 
> Thanks!
> Austin

## Adding to the Website

### 1. Replace Sample Testimonials
Edit `src/testimonials.njk` and replace the placeholder text with real testimonials.

### 2. Add Photos (Optional)
- Save headshots as `firstname-lastname.jpg` in `src/assets/images/`
- Replace the placeholder `<div>` with:
```html
<img src="/assets/images/firstname-lastname.jpg" 
     alt="Person Name" 
     class="w-12 h-12 rounded-full object-cover">
```

### 3. Update Information
For each testimonial, update:
- **Quote**: The actual testimonial text
- **Name**: Person's full name
- **Title/Role**: Their position and organization

### Example Real Testimonial:
```html
<div class="card">
    <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
            <img src="/assets/images/john-smith.jpg" 
                 alt="John Smith" 
                 class="w-12 h-12 rounded-full object-cover">
        </div>
        <div class="flex-1">
            <blockquote class="text-gray-600 dark:text-gray-300 mb-4 italic">
                "Austin's cybersecurity expertise and calm leadership during critical incidents has been invaluable to our organization. His ability to explain complex technical concepts to non-technical stakeholders is exceptional."
            </blockquote>
            <div class="text-sm">
                <div class="font-semibold text-gray-900 dark:text-gray-100">John Smith</div>
                <div class="text-gray-500 dark:text-gray-400">IT Director, Example Organization</div>
            </div>
        </div>
    </div>
</div>
```

## Categories

### Professional (Blue Icons)
- Technical skills and expertise
- Leadership and management
- Problem-solving abilities
- Professional reliability

### Community/Volunteer (Green Icons)  
- Emergency management leadership
- Community service dedication
- Ham radio expertise
- Volunteer commitment

### Personal (Purple Icons)
- Character and values
- Family dedication
- Work-life balance
- Personal qualities

## Tips

- **Keep quotes authentic** - don't edit too heavily
- **Ask permission** before posting
- **Include variety** - different perspectives and roles
- **Update regularly** as you get new testimonials
- **Be gracious** - thank people publicly when appropriate

## Build and Deploy

After adding testimonials:
1. Run `pnpm build` to rebuild the site
2. Test locally with `pnpm dev`
3. Deploy to Cloudflare Pages

Remember: Quality over quantity - a few strong, specific testimonials are better than many generic ones.