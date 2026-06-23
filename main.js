// Scroll-reveal for services rows
  (function(){
    var rows = document.querySelectorAll('.srow');
    if(!rows.length) return;
    if(!('IntersectionObserver' in window)){
      rows.forEach(function(r){ r.classList.add('in-view'); });
      return;
    }
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });
    rows.forEach(function(r){ observer.observe(r); });
  })();

  // Hamburger menu toggle
  (function(){
    var btn = document.getElementById('hamburger-btn');
    var nav = document.querySelector('header nav');
    if(!btn || !nav) return;
    btn.addEventListener('click', function(){
      btn.classList.toggle('open');
      nav.classList.toggle('open');
    });
    // Close nav when a link is clicked
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        btn.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  })();

  // Header scroll shadow
  (function(){
    var header = document.querySelector('header');
    window.addEventListener('scroll', function(){
      if(window.scrollY > 10) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  })();
  // Highlight Home / Services / Courses / Internships / About / Contact in nav based on scroll position
  (function(){
    var homeLink = document.querySelector('nav a[href="#top"]');
    var servicesLink = document.querySelector('nav a[href="#services"]');
    var coursesLink = document.querySelector('nav a[href="#courses"]');
    var internshipsLink = document.querySelector('nav a[href="#internships"]');
    var mockLink = document.querySelector('nav a[href="#mock"]');
    var blogLink = document.querySelector('nav a[href="#blog"]');
    var aboutLink = document.querySelector('nav a[href="#about"]');
    var contactLink = document.querySelector('nav a[href="#contact"]');
    var servicesSection = document.getElementById('services');
    var coursesSection = document.getElementById('courses');
    var internshipsSection = document.getElementById('internships');
    var mockSection = document.getElementById('mock');
    var blogSection = document.getElementById('blog');
    var aboutSection = document.getElementById('about');
    var contactSection = document.getElementById('contact');
    var navLinks = [homeLink, servicesLink, coursesLink, internshipsLink, mockLink, blogLink, aboutLink, contactLink];
    function clearActive(){
      navLinks.forEach(function(l){ if(l) l.classList.remove('active'); });
    }
    function onScroll(){
      var trigger = window.scrollY + window.innerHeight * 0.3;
      clearActive();
      if (contactSection && trigger >= contactSection.offsetTop) {
        if(contactLink) contactLink.classList.add('active');
      } else if (aboutSection && trigger >= aboutSection.offsetTop) {
        if(aboutLink) aboutLink.classList.add('active');
      } else if (blogSection && trigger >= blogSection.offsetTop) {
        if(blogLink) blogLink.classList.add('active');
      } else if (mockSection && trigger >= mockSection.offsetTop) {
        if(mockLink) mockLink.classList.add('active');
      } else if (internshipsSection && trigger >= internshipsSection.offsetTop) {
        if(internshipsLink) internshipsLink.classList.add('active');
      } else if (coursesSection && trigger >= coursesSection.offsetTop) {
        if(coursesLink) coursesLink.classList.add('active');
      } else if (servicesSection && trigger >= servicesSection.offsetTop) {
        if(servicesLink) servicesLink.classList.add('active');
      } else {
        if(homeLink) homeLink.classList.add('active');
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  })();

  // Blog post reading modal
  (function(){
    var overlay = document.getElementById('blog-modal-overlay');
    var modalBody = document.getElementById('blog-modal-body');
    var closeBtn = document.getElementById('blog-modal-close');
    if(!overlay || !modalBody || !closeBtn) return;

    var posts = {
      'resume-mistakes': {
        meta: '5 min read &nbsp;&middot;&nbsp; Career',
        title: '5 Resume Mistakes Costing You Internship Calls',
        body: ''
          + '<p>Recruiters spend an average of just six to eight seconds on a first scan of your resume. In that tiny window, a few avoidable mistakes can quietly knock you out of the running — long before anyone reads about your skills or projects. Here are the five we see most often, and exactly how to fix them.</p>'
          + '<h4>1. A generic, one-size-fits-all resume</h4>'
          + '<p>Sending the same resume to every internship feels efficient, but recruiters can spot it instantly. Tailor your top bullet points to mirror the language used in the job description — if they ask for "data visualization," don\'t write "made charts." Small wording matches make your resume feel built for that exact role.</p>'
          + '<h4>2. Listing duties instead of outcomes</h4>'
          + '<p>"Worked on the marketing team" tells a recruiter nothing about your impact. Reframe every bullet around a result: what changed because you were there? Use numbers wherever you can — followers gained, hours saved, bugs fixed, leads generated.</p>'
          + '<ul>'
          + '<li><strong>Weak:</strong> Helped manage social media accounts</li>'
          + '<li><strong>Strong:</strong> Grew Instagram engagement by 34% over 3 months by testing new content formats</li>'
          + '</ul>'
          + '<h4>3. Burying the most relevant experience</h4>'
          + '<p>Your most relevant project or internship should never be the last thing a recruiter reads. Put it first, even if it means breaking strict chronological order. Relevance beats recency when you\'re competing for a specific role.</p>'
          + '<h4>4. Typos and inconsistent formatting</h4>'
          + '<p>Mismatched fonts, inconsistent date formats, or a stray typo signal carelessness — and for many recruiters, that\'s an instant pass. Read your resume out loud, then have one other person proofread it. Your eyes get used to your own mistakes.</p>'
          + '<h4>5. No clear way to verify your claims</h4>'
          + '<p>If you say you built a website, link to it. If you say you led a project, name the team size and the tool you used to manage it. Specific, checkable details build trust fast — vague claims invite doubt.</p>'
          + '<p>None of these fixes take more than an hour each, but together they\'re often the difference between a resume that gets skimmed and ignored, and one that earns a callback.</p>'
          + '<div class="blog-modal-cta">'
          + '<p>Want a mentor to review your resume before you apply?</p>'
          + '<a href="https://forms.gle/wwwGUGoy5c4iXQT76" target="_blank">Get in Touch</a>'
          + '</div>'
      },
      'interview-confidence': {
        meta: '4 min read &nbsp;&middot;&nbsp; Interviews',
        title: 'How to Answer "Tell Me About Yourself" Confidently',
        body: ''
          + '<p>It is almost always the very first question in an interview, and it sets the tone for everything that follows. Yet most candidates either ramble through their entire life story or freeze up trying to figure out what the interviewer actually wants to hear. Here is a simple structure that works every time.</p>'
          + '<h4>1. Start with where you are now</h4>'
          + '<p>Open with a one-line snapshot of your current situation — your course, your focus area, or the kind of work you have been doing. This gives the interviewer instant context before you go any further.</p>'
          + '<h4>2. Walk through the relevant journey</h4>'
          + '<p>Pick two or three experiences that build toward the role you are interviewing for, not your entire timeline. Each one should answer a silent question in the interviewer\'s head: "why does this matter for the job I am hiring for?"</p>'
          + '<ul>'
          + '<li><strong>Weak:</strong> I have done a lot of different projects and internships over the years</li>'
          + '<li><strong>Strong:</strong> I started with web development, then moved into backend work during my last internship, which is what drew me to this role</li>'
          + '</ul>'
          + '<h4>3. Land on why you are here</h4>'
          + '<p>Close by connecting your story directly to the role in front of you. This is the line that makes the whole answer feel intentional instead of accidental.</p>'
          + '<h4>4. Keep it under 90 seconds</h4>'
          + '<p>Practice with a timer. Most candidates talk for three or four minutes without realizing it, and by the end the interviewer has mentally checked out. A tight, confident answer leaves them wanting to ask more — which is exactly where you want to be.</p>'
          + '<p>This question is not really about your life story — it is about whether you can communicate clearly under a little pressure. Nail the structure, and the rest of the interview tends to follow the same calm tone.</p>'
          + '<div class="blog-modal-cta">'
          + '<p>Want to practice this with a mentor before your next interview?</p>'
          + '<a href="https://forms.gle/wwwGUGoy5c4iXQT76" target="_blank">Get in Touch</a>'
          + '</div>'
      },
      'remote-productivity': {
        meta: '6 min read &nbsp;&middot;&nbsp; Remote Work',
        title: 'Staying Productive During a Remote Internship',
        body: ''
          + '<p>Without a manager walking past your desk or a team physically around you, remote internships demand a different kind of discipline. The interns who stand out remotely are not necessarily the most skilled — they are the ones who make their work visible and their progress easy to track. Here is how to do both.</p>'
          + '<h4>1. Over-communicate, on purpose</h4>'
          + '<p>In an office, your effort is visible by default. Remotely, it isn\'t — so you have to narrate it. A short daily update on what you finished, what you are stuck on, and what is next keeps your mentor confident without needing to check in on you.</p>'
          + '<h4>2. Time-block your day like it is scheduled for you</h4>'
          + '<p>Open-ended remote days quietly turn into unfocused ones. Block specific hours for deep work, specific hours for meetings, and specific hours for learning — and treat those blocks the way you would treat a class you can\'t skip.</p>'
          + '<ul>'
          + '<li><strong>Weak:</strong> I\'ll get to the assigned task sometime today</li>'
          + '<li><strong>Strong:</strong> 10–12: finish the assigned task, 12–1: break, 1–2: review feedback from yesterday</li>'
          + '</ul>'
          + '<h4>3. Ask questions earlier than feels comfortable</h4>'
          + '<p>It is tempting to struggle silently for hours on a remote task to avoid looking lost. In practice, asking a clear question after thirty minutes of being stuck is far more impressive than submitting late work that needed it.</p>'
          + '<h4>4. Show your work, not just your results</h4>'
          + '<p>Share drafts, rough versions, and work-in-progress screenshots — not just the polished final output. It gives your mentor a chance to redirect you early, before hours of work go in the wrong direction.</p>'
          + '<p>None of this requires more hours in the day — just a bit more structure than you would naturally default to. Build these habits early, and remote work stops feeling like a disadvantage.</p>'
          + '<div class="blog-modal-cta">'
          + '<p>Looking for a remote internship that actually mentors you?</p>'
          + '<a href="#internships">Explore Internships</a>'
          + '</div>'
      },
      'skills-2026': {
        meta: '4 min read &nbsp;&middot;&nbsp; Skills',
        title: 'Skills That Matter More Than Your Degree in 2026',
        body: ''
          + '<p>Recruiters today are far more interested in what you can actually do than in which college stamped your degree. That shift is good news for students who are willing to build real, visible proof of skill — even before graduating. Here is what that looks like in practice.</p>'
          + '<h4>1. A portfolio over a transcript</h4>'
          + '<p>A handful of finished projects you can walk a recruiter through beats a long list of course names every time. Even two or three small, well-explained projects show more than a GPA ever could.</p>'
          + '<h4>2. Comfort with AI-assisted tools</h4>'
          + '<p>Knowing how to work alongside AI tools — for coding, writing, research, or design — is quickly becoming a baseline expectation rather than a bonus skill. Companies want people who can use these tools to move faster, not people who avoid them.</p>'
          + '<h4>3. Communication that holds up under scrutiny</h4>'
          + '<p>Being able to explain a technical decision clearly, in writing or out loud, is consistently rated by hiring managers as more important than raw technical depth alone.</p>'
          + '<ul>'
          + '<li><strong>Weak:</strong> I just know it works, I followed a tutorial</li>'
          + '<li><strong>Strong:</strong> I chose this approach because it scales better as the data grows, here is the trade-off I considered</li>'
          + '</ul>'
          + '<h4>4. Self-directed learning</h4>'
          + '<p>The half-life of any specific technical skill keeps shrinking. What recruiters are really screening for is whether you can pick up something new quickly when the role demands it — and show evidence that you already have.</p>'
          + '<p>A degree still opens doors, but it is no longer the only key. Building visible proof of these skills alongside your studies is what actually gets you noticed.</p>'
          + '<div class="blog-modal-cta">'
          + '<p>Want to start building real, provable skills today?</p>'
          + '<a href="#courses">Explore Courses</a>'
          + '</div>'
      },
      'networking-student': {
        meta: '3 min read &nbsp;&middot;&nbsp; Networking',
        title: 'Building a Network as a Student (Without Feeling Fake)',
        body: ''
          + '<p>Networking has a bad reputation among students, mostly because it gets reduced to "collecting contacts" instead of building real relationships. Done well, it feels less like cold outreach and more like staying genuinely curious about people. Here is how to approach it without the awkwardness.</p>'
          + '<h4>1. Reach out with a real reason, not a generic ask</h4>'
          + '<p>"Can I pick your brain?" rarely gets a reply. A specific, easy-to-answer question about something the person has actually done gets a response far more often, because it shows you did your homework.</p>'
          + '<ul>'
          + '<li><strong>Weak:</strong> Hi, can we connect? I want to learn about your field</li>'
          + '<li><strong>Strong:</strong> Hi, I saw you moved from support into product — what made that switch work for you?</li>'
          + '</ul>'
          + '<h4>2. Give before you ask</h4>'
          + '<p>Share something useful — an article, a comment on their work, a small piece of help — before you ever ask for anything. It completely changes how a request lands later.</p>'
          + '<h4>3. Keep in touch without an agenda</h4>'
          + '<p>An occasional message congratulating someone on a new role or sharing something relevant to their work keeps the connection alive without it feeling transactional every single time.</p>'
          + '<h4>4. Mentors are built, not found in one conversation</h4>'
          + '<p>Nobody becomes your mentor after a single coffee chat. It happens gradually, through repeated small interactions where you show up consistently and follow through on what you say you will do.</p>'
          + '<p>Real networking is just staying genuinely interested in people over time. Start with one or two relationships, and let the rest grow naturally from there.</p>'
          + '<div class="blog-modal-cta">'
          + '<p>Want mentor-led guidance while you build your network?</p>'
          + '<a href="https://forms.gle/wwwGUGoy5c4iXQT76" target="_blank">Get in Touch</a>'
          + '</div>'
      }
    };

    function openPost(key){
      var post = posts[key];
      if(!post) return;
      modalBody.innerHTML =
        '<div class="blog-modal-meta">'
        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'
        + post.meta
        + '</div>'
        + '<h2 id="blog-modal-title">' + post.title + '</h2>'
        + post.body;
      overlay.classList.add('open');
      document.body.classList.add('blog-modal-locked');
      modalBody.scrollTop = 0;
    }

    function closePost(){
      overlay.classList.remove('open');
      document.body.classList.remove('blog-modal-locked');
    }

    var readBtns = document.querySelectorAll('.read-more-btn');
    readBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        var key = btn.getAttribute('data-post');
        if(key && posts[key]){
          openPost(key);
        } else {
          var original = btn.innerHTML;
          btn.innerHTML = 'Opening soon ✓';
          setTimeout(function(){ btn.innerHTML = original; }, 1800);
        }
      });
    });

    closeBtn.addEventListener('click', closePost);
    overlay.addEventListener('click', function(e){
      if(e.target === overlay) closePost();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && overlay.classList.contains('open')) closePost();
    });
  })();

  // Multi-course Tutorial viewer (sidebar + content), opened from any course card
  (function(){
    var overlay = document.getElementById('tutorial-overlay');
    var sidebar = document.getElementById('tutorial-sidebar');
    var content = document.getElementById('tutorial-content');
    var closeBtn = document.getElementById('tutorial-close');
    var brandText = document.getElementById('tutorial-brand-text');
    var sidebarLabel = document.getElementById('tutorial-sidebar-label');
    var openBtns = document.querySelectorAll('.course-explore-btn');
    if(!overlay || !sidebar || !content || !closeBtn) return;

    var coursesData = {

      python: {
        name: 'Python',
        sidebarLabel: 'PYTHON TUTORIAL',
        topics: [
          {
            id: 'home',
            label: 'Python HOME',
            title: 'Python at Intern Crowd',
            html: ''
              + '<p>Welcome to the Intern Crowd Python track. This page walks you through what the course covers, topic by topic, using the sidebar on the left. Click any topic to jump straight to it.</p>'
              + '<p>Python is one of the most beginner-friendly programming languages around, and also one of the most useful — which is exactly why it is the first course most of our students pick.</p>'
          },
          {
            id: 'intro',
            label: 'Python Intro',
            title: 'What is Python?',
            html: ''
              + '<p>Python is a high-level, easy-to-read programming language. It was designed to let you express ideas in fewer lines of code than most other languages.</p>'
              + '<p>In our internship track, Python is used for:</p>'
              + '<ul>'
              + '<li>building small web apps and APIs</li>'
              + '<li>automating repetitive tasks</li>'
              + '<li>working with data and basic analysis</li>'
              + '<li>writing scripts that solve everyday problems</li>'
              + '</ul>'
              + '<h3>Why we teach Python first</h3>'
              + '<ul>'
              + '<li>Its syntax reads almost like plain English, so beginners pick it up fast</li>'
              + '<li>It is used across web development, data, automation, and AI — so the skill carries over</li>'
              + '<li>It has a huge ecosystem of ready-made libraries, so you can build real things quickly</li>'
              + '</ul>'
          },
          {
            id: 'getstarted',
            label: 'Python Get Started',
            title: 'Getting Started',
            html: ''
              + '<p>To start writing Python, all you need is the Python interpreter installed and a code editor. In our sessions, you will set this up in the first class with a mentor guiding you step by step.</p>'
              + '<p>Once it is installed, you can run a file directly from the terminal, or use an online editor while you are still getting comfortable.</p>'
          },
          {
            id: 'syntax',
            label: 'Python Syntax',
            title: 'Python Syntax',
            html: ''
              + '<p>Python does not use curly braces or semicolons like many other languages. Instead, it uses indentation (spacing) to group lines of code together.</p>'
              + '<div class="tutorial-code-block"><pre>if <span class="code-str">5</span> > <span class="code-str">2</span>:\n    print(<span class="code-str">"Five is greater than two!"</span>)</pre></div>'
              + '<p>That indentation is not just for looks — in Python, it is part of the syntax itself, so getting it right matters from day one.</p>'
          },
          {
            id: 'variables',
            label: 'Python Variables',
            title: 'Python Variables',
            html: ''
              + '<p>A variable is simply a name you give to a value so you can use it later. In Python, you don\'t need to declare a type — it figures that out on its own.</p>'
              + '<div class="tutorial-code-block"><pre>name = <span class="code-str">"Intern Crowd"</span>\nbatch = <span class="code-str">2026</span>\nprint(name, batch)</pre></div>'
              + '<p>Variables can be changed at any point, and a single line can even assign several variables together — something we cover hands-on in class.</p>'
          },
          {
            id: 'datatypes',
            label: 'Python Data Types',
            title: 'Python Data Types',
            html: ''
              + '<p>Every value in Python belongs to a data type. The ones you will use constantly are:</p>'
              + '<ul>'
              + '<li><strong>Text:</strong> str</li>'
              + '<li><strong>Numeric:</strong> int, float</li>'
              + '<li><strong>Sequence:</strong> list, tuple, range</li>'
              + '<li><strong>Mapping:</strong> dict</li>'
              + '<li><strong>Boolean:</strong> bool</li>'
              + '<li><strong>Set:</strong> set</li>'
              + '</ul>'
              + '<p>Knowing which type you\'re working with shapes everything else — which operations you can run, how you loop over it, and how you store it.</p>'
          },
          {
            id: 'operators',
            label: 'Python Operators',
            title: 'Python Operators',
            html: ''
              + '<p>Operators let you perform actions on values and variables. Python groups them into a few familiar families:</p>'
              + '<ul>'
              + '<li><strong>Arithmetic:</strong> +, -, *, /, %</li>'
              + '<li><strong>Comparison:</strong> ==, !=, &gt;, &lt;</li>'
              + '<li><strong>Logical:</strong> and, or, not</li>'
              + '<li><strong>Assignment:</strong> =, +=, -=</li>'
              + '</ul>'
          },
          {
            id: 'lists',
            label: 'Python Lists',
            title: 'Python Lists',
            html: ''
              + '<p>A list stores multiple values in a single variable, in a particular order, and you can change it any time after it\'s created.</p>'
              + '<div class="tutorial-code-block"><pre>skills = [<span class="code-str">"Python"</span>, <span class="code-str">"SQL"</span>, <span class="code-str">"Git"</span>]\nprint(skills[0])</pre></div>'
              + '<p>Lists are everywhere in real Python projects — from storing form data to processing rows from a spreadsheet.</p>'
          },
          {
            id: 'functions',
            label: 'Python Functions',
            title: 'Python Functions',
            html: ''
              + '<p>A function is a reusable block of code that runs only when you call it. Functions help you avoid repeating yourself and keep your code organized.</p>'
              + '<div class="tutorial-code-block"><pre>def greet(name):\n    print(<span class="code-str">f"Hello, {name}!"</span>)\n\ngreet(<span class="code-str">"Student"</span>)</pre></div>'
              + '<p>By the time you reach the mini-projects in this course, you will be writing your own functions without thinking twice about it.</p>'
          },
          {
            id: 'projects',
            label: 'Mini Projects',
            title: 'Mini Projects & Capstone',
            html: ''
              + '<p>Every module in this track ends with something you build, not just something you read. Past student projects from this course have included:</p>'
              + '<ul>'
              + '<li>A simple file-renaming automation script</li>'
              + '<li>A to-do list manager run from the terminal</li>'
              + '<li>A basic data cleaner for spreadsheet exports</li>'
              + '</ul>'
              + '<p>You\'ll finish the track with a small capstone project of your own, ready to show in interviews.</p>'
          }
        ]
      },

      webdev: {
        name: 'Web Development',
        sidebarLabel: 'WEB DEV TUTORIAL',
        topics: [
          {
            id: 'home',
            label: 'Web Dev HOME',
            title: 'Web Development at Intern Crowd',
            html: ''
              + '<p>Welcome to the Intern Crowd Web Development track. This page walks you through what the course covers, topic by topic, using the sidebar on the left. Click any topic to jump straight to it.</p>'
              + '<p>Web development is the skill behind every website and web app you have ever used — and it is one of the fastest ways to go from "I want to build something" to actually shipping it.</p>'
          },
          {
            id: 'intro',
            label: 'Web Dev Intro',
            title: 'What is Web Development?',
            html: ''
              + '<p>Web development is the practice of building websites and web applications — everything from the page layout you see, to the logic that runs behind a working app.</p>'
              + '<p>In our internship track, web development skills are used for:</p>'
              + '<ul>'
              + '<li>building responsive, multi-page websites</li>'
              + '<li>creating interactive UI with JavaScript</li>'
              + '<li>connecting a frontend to real data with frameworks</li>'
              + '<li>deploying a finished site for the world to see</li>'
              + '</ul>'
              + '<h3>Why we teach Web Dev early</h3>'
              + '<ul>'
              + '<li>You get to see visible results from your very first lesson</li>'
              + '<li>It blends design thinking with logical problem solving</li>'
              + '<li>It is the most in-demand entry point into tech hiring today</li>'
              + '</ul>'
          },
          {
            id: 'getstarted',
            label: 'Web Dev Get Started',
            title: 'Getting Started',
            html: ''
              + '<p>To start building websites, all you need is a code editor and a browser. In our sessions, you will set up your editor in the first class with a mentor guiding you step by step.</p>'
              + '<p>Once set up, you will write your first HTML page and open it directly in your browser to see it come alive.</p>'
          },
          {
            id: 'html',
            label: 'HTML Basics',
            title: 'HTML Basics',
            html: ''
              + '<p>HTML (HyperText Markup Language) is the skeleton of every web page. It uses tags to define structure — headings, paragraphs, links, and images.</p>'
              + '<div class="tutorial-code-block"><pre>&lt;h1&gt;Hello, Intern Crowd!&lt;/h1&gt;\n&lt;p&gt;This is my first web page.&lt;/p&gt;</pre></div>'
              + '<p>Every other web technology you learn is built on top of this basic structure, so we spend real time making sure it is solid.</p>'
          },
          {
            id: 'css',
            label: 'CSS Styling',
            title: 'CSS Styling',
            html: ''
              + '<p>CSS (Cascading Style Sheets) controls how your HTML looks — colors, spacing, fonts, and layout.</p>'
              + '<div class="tutorial-code-block"><pre>h1 {\n  color: <span class="code-str">#1A3FD6</span>;\n  font-size: 32px;\n}</pre></div>'
              + '<p>You will practice layout systems like Flexbox and Grid, which are what make modern, responsive designs possible.</p>'
          },
          {
            id: 'javascript',
            label: 'JavaScript Basics',
            title: 'JavaScript Basics',
            html: ''
              + '<p>JavaScript is what makes a page interactive — button clicks, form validation, animations, and live updates without reloading the page.</p>'
              + '<div class="tutorial-code-block"><pre>const button = document.querySelector(<span class="code-str">"button"</span>);\nbutton.addEventListener(<span class="code-str">"click"</span>, () =&gt; {\n  alert(<span class="code-str">"Hello, Intern Crowd!"</span>);\n});</pre></div>'
              + '<p>Once you are comfortable here, frameworks like React will feel like a natural next step rather than a leap.</p>'
          },
          {
            id: 'responsive',
            label: 'Responsive Design',
            title: 'Responsive Design',
            html: ''
              + '<p>Responsive design means your site looks good on every screen — phone, tablet, or desktop — without building separate versions.</p>'
              + '<ul>'
              + '<li><strong>Media queries:</strong> apply different styles at different screen widths</li>'
              + '<li><strong>Flexible units:</strong> use %, rem, and vw/vh instead of fixed pixels</li>'
              + '<li><strong>Mobile-first thinking:</strong> design for small screens, then scale up</li>'
              + '</ul>'
          },
          {
            id: 'frameworks',
            label: 'Frameworks & Tools',
            title: 'Frameworks & Tools',
            html: ''
              + '<p>Once the fundamentals are solid, you will get introduced to the tools professional teams use day to day:</p>'
              + '<ul>'
              + '<li><strong>React:</strong> for building reusable, component-based interfaces</li>'
              + '<li><strong>Git &amp; GitHub:</strong> for version control and team collaboration</li>'
              + '<li><strong>npm:</strong> for managing project dependencies</li>'
              + '</ul>'
          },
          {
            id: 'projects',
            label: 'Mini Projects',
            title: 'Mini Projects & Capstone',
            html: ''
              + '<p>Every module in this track ends with something you build, not just something you read. Past student projects from this course have included:</p>'
              + '<ul>'
              + '<li>A personal portfolio website</li>'
              + '<li>A responsive restaurant landing page</li>'
              + '<li>A small interactive to-do list app</li>'
              + '</ul>'
              + '<p>You\'ll finish the track with a small capstone project of your own, ready to show in interviews.</p>'
          }
        ]
      },

      java: {
        name: 'Java',
        sidebarLabel: 'JAVA TUTORIAL',
        topics: [
          {
            id: 'home',
            label: 'Java HOME',
            title: 'Java at Intern Crowd',
            html: ''
              + '<p>Welcome to the Intern Crowd Java track. This page walks you through what the course covers, topic by topic, using the sidebar on the left. Click any topic to jump straight to it.</p>'
              + '<p>Java has powered enterprise backend systems for decades, and it remains one of the strongest languages to learn if you want a deep grounding in object-oriented programming.</p>'
          },
          {
            id: 'intro',
            label: 'Java Intro',
            title: 'What is Java?',
            html: ''
              + '<p>Java is a class-based, object-oriented language built to run anywhere — "write once, run anywhere" — thanks to the Java Virtual Machine (JVM).</p>'
              + '<p>In our internship track, Java is used for:</p>'
              + '<ul>'
              + '<li>building robust backend services</li>'
              + '<li>practicing strong object-oriented design</li>'
              + '<li>working with databases through real applications</li>'
              + '<li>preparing for technical interviews that lean on core CS fundamentals</li>'
              + '</ul>'
              + '<h3>Why we teach Java for backend roles</h3>'
              + '<ul>'
              + '<li>Its strict typing forces good habits early on</li>'
              + '<li>It is the backbone of countless enterprise systems still in production</li>'
              + '<li>OOP concepts learned here transfer directly to interviews and other languages</li>'
              + '</ul>'
          },
          {
            id: 'getstarted',
            label: 'Java Get Started',
            title: 'Getting Started',
            html: ''
              + '<p>To start writing Java, you will need the JDK (Java Development Kit) installed along with an IDE. In our sessions, you will set this up in the first class with a mentor guiding you step by step.</p>'
              + '<p>Once installed, you will compile and run your first program directly from the terminal or your IDE.</p>'
          },
          {
            id: 'syntax',
            label: 'Java Syntax',
            title: 'Java Syntax',
            html: ''
              + '<p>Every Java program lives inside a class, and execution always starts from a method called <code>main</code>.</p>'
              + '<div class="tutorial-code-block"><pre>public class Main {\n  public static void main(String[] args) {\n    System.out.println(<span class="code-str">"Hello, Intern Crowd!"</span>);\n  }\n}</pre></div>'
              + '<p>Unlike Python, Java requires curly braces and semicolons — and every variable must have a declared type.</p>'
          },
          {
            id: 'variables',
            label: 'Java Variables & Types',
            title: 'Java Variables & Data Types',
            html: ''
              + '<p>In Java, you must declare the type of a variable before using it, which is different from more flexible languages.</p>'
              + '<div class="tutorial-code-block"><pre>String name = <span class="code-str">"Intern Crowd"</span>;\nint batch = <span class="code-str">2026</span>;\nboolean active = <span class="code-str">true</span>;</pre></div>'
              + '<p>Common types you will use constantly include <code>int</code>, <code>double</code>, <code>boolean</code>, <code>char</code>, and <code>String</code>.</p>'
          },
          {
            id: 'oop',
            label: 'OOP Concepts',
            title: 'Object-Oriented Programming',
            html: ''
              + '<p>Java is built around objects — bundles of data and behavior modeled on real-world things. Four ideas anchor everything you will build:</p>'
              + '<ul>'
              + '<li><strong>Encapsulation:</strong> keeping data safely inside a class</li>'
              + '<li><strong>Inheritance:</strong> reusing behavior across related classes</li>'
              + '<li><strong>Polymorphism:</strong> letting one method behave differently for different objects</li>'
              + '<li><strong>Abstraction:</strong> hiding complex details behind a simple interface</li>'
              + '</ul>'
          },
          {
            id: 'classes',
            label: 'Classes & Objects',
            title: 'Classes & Objects',
            html: ''
              + '<p>A class is a blueprint, and an object is an actual instance built from that blueprint.</p>'
              + '<div class="tutorial-code-block"><pre>class Student {\n  String name;\n  Student(String name) {\n    this.name = name;\n  }\n}\n\nStudent s = new Student(<span class="code-str">"Asha"</span>);</pre></div>'
              + '<p>You will write dozens of small classes in this course before moving on to multi-class applications.</p>'
          },
          {
            id: 'collections',
            label: 'Collections',
            title: 'Java Collections',
            html: ''
              + '<p>Collections let you store and manage groups of objects efficiently. The ones you will reach for most often are:</p>'
              + '<ul>'
              + '<li><strong>ArrayList:</strong> an ordered, resizable list</li>'
              + '<li><strong>HashMap:</strong> key-value pairs for fast lookups</li>'
              + '<li><strong>HashSet:</strong> a collection with no duplicate values</li>'
              + '</ul>'
          },
          {
            id: 'projects',
            label: 'Mini Projects',
            title: 'Mini Projects & Capstone',
            html: ''
              + '<p>Every module in this track ends with something you build, not just something you read. Past student projects from this course have included:</p>'
              + '<ul>'
              + '<li>A simple library management system</li>'
              + '<li>A console-based banking simulator</li>'
              + '<li>A basic student record system backed by collections</li>'
              + '</ul>'
              + '<p>You\'ll finish the track with a small capstone project of your own, ready to show in interviews.</p>'
          }
        ]
      },

      android: {
        name: 'Android',
        sidebarLabel: 'ANDROID TUTORIAL',
        topics: [
          {
            id: 'home',
            label: 'Android HOME',
            title: 'Android Development at Intern Crowd',
            html: ''
              + '<p>Welcome to the Intern Crowd Android Development track. This page walks you through what the course covers, topic by topic, using the sidebar on the left. Click any topic to jump straight to it.</p>'
              + '<p>Android powers billions of devices worldwide, and building for it teaches you mobile-first thinking that most other tracks don\'t cover.</p>'
          },
          {
            id: 'intro',
            label: 'Android Intro',
            title: 'What is Android Development?',
            html: ''
              + '<p>Android development is the process of building apps that run on Android devices, using Kotlin or Java together with the Android SDK.</p>'
              + '<p>In our internship track, Android skills are used for:</p>'
              + '<ul>'
              + '<li>designing app screens and navigation flows</li>'
              + '<li>handling user input and on-device storage</li>'
              + '<li>connecting an app to live data with APIs</li>'
              + '<li>preparing an app for publishing to the Play Store</li>'
              + '</ul>'
              + '<h3>Why we teach Android hands-on</h3>'
              + '<ul>'
              + '<li>You build something you and your friends can actually install and use</li>'
              + '<li>Mobile development has its own patterns worth learning early</li>'
              + '<li>Android Studio mirrors the tools used by real product teams</li>'
              + '</ul>'
          },
          {
            id: 'getstarted',
            label: 'Android Get Started',
            title: 'Getting Started',
            html: ''
              + '<p>To start building Android apps, you will need Android Studio installed along with the Android SDK. In our sessions, you will set this up in the first class with a mentor guiding you step by step.</p>'
              + '<p>Once installed, you will run your first app on a virtual device or your own phone within the same session.</p>'
          },
          {
            id: 'kotlin',
            label: 'Kotlin Basics',
            title: 'Kotlin Basics',
            html: ''
              + '<p>Kotlin is the modern, official language for Android development — concise, safe, and fully interoperable with Java.</p>'
              + '<div class="tutorial-code-block"><pre>fun main() {\n  val name = <span class="code-str">"Intern Crowd"</span>\n  println(<span class="code-str">"Hello, $name!"</span>)\n}</pre></div>'
              + '<p>You will get comfortable with Kotlin syntax before touching your first Android layout, so the app-building lessons feel smooth.</p>'
          },
          {
            id: 'activities',
            label: 'Activities & Layouts',
            title: 'Activities & Layouts',
            html: ''
              + '<p>An Activity represents a single screen in an Android app, and a layout file defines what that screen looks like.</p>'
              + '<div class="tutorial-code-block"><pre>&lt;TextView\n  android:text=<span class="code-str">"Hello, Intern Crowd!"</span>\n  android:layout_width=<span class="code-str">"wrap_content"</span>\n  android:layout_height=<span class="code-str">"wrap_content"</span> /&gt;</pre></div>'
              + '<p>You will build multiple screens and learn how to move between them — the foundation of any real app.</p>'
          },
          {
            id: 'ui',
            label: 'UI Components',
            title: 'UI Components',
            html: ''
              + '<p>Android gives you a rich set of building blocks for screens. The ones you will use constantly are:</p>'
              + '<ul>'
              + '<li><strong>TextView:</strong> displays text</li>'
              + '<li><strong>Button:</strong> handles taps</li>'
              + '<li><strong>RecyclerView:</strong> displays scrollable lists efficiently</li>'
              + '<li><strong>EditText:</strong> captures user input</li>'
              + '</ul>'
          },
          {
            id: 'intents',
            label: 'Intents & Navigation',
            title: 'Intents & Navigation',
            html: ''
              + '<p>An Intent is how Android screens talk to each other — opening a new screen, sharing data, or launching another app.</p>'
              + '<div class="tutorial-code-block"><pre>val intent = Intent(this, SecondActivity::class.java)\nstartActivity(intent)</pre></div>'
              + '<p>Once navigation feels natural, multi-screen apps stop feeling complicated and start feeling like assembling familiar pieces.</p>'
          },
          {
            id: 'storage',
            label: 'Data & Storage',
            title: 'Data & Storage',
            html: ''
              + '<p>Most real apps need to remember something between sessions. You will practice a few common approaches:</p>'
              + '<ul>'
              + '<li><strong>SharedPreferences:</strong> for small bits of saved data</li>'
              + '<li><strong>Room database:</strong> for structured, queryable local data</li>'
              + '<li><strong>Remote APIs:</strong> for data that lives on a server</li>'
              + '</ul>'
          },
          {
            id: 'projects',
            label: 'Mini Projects',
            title: 'Mini Projects & Capstone',
            html: ''
              + '<p>Every module in this track ends with something you build, not just something you read. Past student projects from this course have included:</p>'
              + '<ul>'
              + '<li>A personal expense tracker app</li>'
              + '<li>A simple weather app using a live API</li>'
              + '<li>A note-taking app backed by a local database</li>'
              + '</ul>'
              + '<p>You\'ll finish the track with a small capstone project of your own, ready to show in interviews.</p>'
          }
        ]
      },

      cloud: {
        name: 'Cloud Computing',
        sidebarLabel: 'CLOUD TUTORIAL',
        topics: [
          {
            id: 'home',
            label: 'Cloud HOME',
            title: 'Cloud Computing at Intern Crowd',
            html: ''
              + '<p>Welcome to the Intern Crowd Cloud Computing track. This page walks you through what the course covers, topic by topic, using the sidebar on the left. Click any topic to jump straight to it.</p>'
              + '<p>Cloud skills are what let a project move from "running on my laptop" to "live and reachable by anyone in the world" — a step most courses skip entirely.</p>'
          },
          {
            id: 'intro',
            label: 'Cloud Intro',
            title: 'What is Cloud Computing?',
            html: ''
              + '<p>Cloud computing means renting computing power, storage, and services over the internet instead of running your own physical servers.</p>'
              + '<p>In our internship track, cloud skills are used for:</p>'
              + '<ul>'
              + '<li>deploying and hosting live applications</li>'
              + '<li>managing scalable storage and databases</li>'
              + '<li>setting up basic CI/CD pipelines</li>'
              + '<li>understanding cost and resource management at a beginner level</li>'
              + '</ul>'
              + '<h3>Why we teach Cloud hands-on</h3>'
              + '<ul>'
              + '<li>Almost every modern company runs on cloud infrastructure</li>'
              + '<li>It connects directly with the web and backend skills you already have</li>'
              + '<li>It is one of the highest-paying entry points into tech right now</li>'
              + '</ul>'
          },
          {
            id: 'getstarted',
            label: 'Cloud Get Started',
            title: 'Getting Started',
            html: ''
              + '<p>To start working with the cloud, all you need is a free-tier account on a major provider and a terminal. In our sessions, you will set this up in the first class with a mentor guiding you step by step.</p>'
              + '<p>Once set up, you will deploy a simple "Hello World" page to the cloud within your very first lesson.</p>'
          },
          {
            id: 'concepts',
            label: 'Core Concepts',
            title: 'Core Cloud Concepts',
            html: ''
              + '<p>A few terms come up constantly once you start working with the cloud:</p>'
              + '<ul>'
              + '<li><strong>IaaS:</strong> Infrastructure as a Service — raw virtual servers</li>'
              + '<li><strong>PaaS:</strong> Platform as a Service — a managed environment to deploy code into</li>'
              + '<li><strong>SaaS:</strong> Software as a Service — ready-to-use software over the internet</li>'
              + '</ul>'
              + '<p>Knowing where a tool fits among these helps you understand why it works the way it does.</p>'
          },
          {
            id: 'deployment',
            label: 'Deployment Basics',
            title: 'Deployment Basics',
            html: ''
              + '<p>Deploying means taking code from your local machine and making it run somewhere publicly accessible.</p>'
              + '<div class="tutorial-code-block"><pre>git push origin main\n# triggers an automatic deployment</pre></div>'
              + '<p>You will practice deploying small web apps multiple times until pushing an update feels routine rather than risky.</p>'
          },
          {
            id: 'storage',
            label: 'Storage & Databases',
            title: 'Cloud Storage & Databases',
            html: ''
              + '<p>Cloud providers offer storage that scales automatically, instead of you managing disk space yourself.</p>'
              + '<ul>'
              + '<li><strong>Object storage:</strong> for files, images, and backups</li>'
              + '<li><strong>Managed databases:</strong> for structured application data</li>'
              + '<li><strong>Caching layers:</strong> for speeding up repeated requests</li>'
              + '</ul>'
          },
          {
            id: 'networking',
            label: 'Networking Basics',
            title: 'Cloud Networking Basics',
            html: ''
              + '<p>Even a simple deployment depends on a few networking ideas working correctly behind the scenes.</p>'
              + '<ul>'
              + '<li><strong>Domains &amp; DNS:</strong> pointing a name to your server</li>'
              + '<li><strong>HTTPS:</strong> securing traffic between users and your app</li>'
              + '<li><strong>Load balancing:</strong> spreading traffic across multiple servers</li>'
              + '</ul>'
          },
          {
            id: 'cicd',
            label: 'CI/CD Basics',
            title: 'CI/CD Basics',
            html: ''
              + '<p>CI/CD automates testing and deployment so changes go live safely without manual, repetitive steps.</p>'
              + '<div class="tutorial-code-block"><pre># Example pipeline step\nrun: npm test &amp;&amp; npm run deploy</pre></div>'
              + '<p>By the end of this module, pushing a change and watching it deploy automatically will feel completely normal.</p>'
          },
          {
            id: 'projects',
            label: 'Mini Projects',
            title: 'Mini Projects & Capstone',
            html: ''
              + '<p>Every module in this track ends with something you build, not just something you read. Past student projects from this course have included:</p>'
              + '<ul>'
              + '<li>A personal portfolio site deployed live on the cloud</li>'
              + '<li>A small app connected to a managed cloud database</li>'
              + '<li>A basic automated deployment pipeline for a sample project</li>'
              + '</ul>'
              + '<p>You\'ll finish the track with a small capstone project of your own, ready to show in interviews.</p>'
          }
        ]
      },

      marketing: {
        name: 'Digital Marketing',
        sidebarLabel: 'MARKETING TUTORIAL',
        topics: [
          {
            id: 'home',
            label: 'Marketing HOME',
            title: 'Digital Marketing at Intern Crowd',
            html: ''
              + '<p>Welcome to the Intern Crowd Digital Marketing track. This page walks you through what the course covers, topic by topic, using the sidebar on the left. Click any topic to jump straight to it.</p>'
              + '<p>Digital marketing is the skill set behind getting any product, page, or idea actually seen and acted on — and it pairs well with almost every other track we teach.</p>'
          },
          {
            id: 'intro',
            label: 'Marketing Intro',
            title: 'What is Digital Marketing?',
            html: ''
              + '<p>Digital marketing is the practice of promoting products, services, or content using online channels — search, social media, email, and paid ads.</p>'
              + '<p>In our internship track, digital marketing skills are used for:</p>'
              + '<ul>'
              + '<li>growing an audience through organic search (SEO)</li>'
              + '<li>planning and running social media campaigns</li>'
              + '<li>writing content that converts readers into customers</li>'
              + '<li>reading analytics to know what is actually working</li>'
              + '</ul>'
              + '<h3>Why we teach Marketing alongside tech skills</h3>'
              + '<ul>'
              + '<li>Every product, app, or website eventually needs an audience</li>'
              + '<li>It is highly measurable — you can see results in real numbers</li>'
              + '<li>It is one of the most accessible entry points into business roles</li>'
              + '</ul>'
          },
          {
            id: 'getstarted',
            label: 'Marketing Get Started',
            title: 'Getting Started',
            html: ''
              + '<p>To start in digital marketing, all you need is access to a few free analytics and social tools. In our sessions, you will set these up in the first class with a mentor guiding you step by step.</p>'
              + '<p>Once set up, you will analyze a real public page or profile in your very first lesson to start thinking like a marketer.</p>'
          },
          {
            id: 'seo',
            label: 'SEO Basics',
            title: 'SEO Basics',
            html: ''
              + '<p>SEO (Search Engine Optimization) is the practice of helping content rank higher in search results without paying for ads.</p>'
              + '<ul>'
              + '<li><strong>Keywords:</strong> the terms people actually search for</li>'
              + '<li><strong>On-page SEO:</strong> titles, headings, and content structure</li>'
              + '<li><strong>Backlinks:</strong> other sites linking back to yours</li>'
              + '</ul>'
              + '<p>You will practice optimizing a real page from start to finish during this module.</p>'
          },
          {
            id: 'social',
            label: 'Social Media Marketing',
            title: 'Social Media Marketing',
            html: ''
              + '<p>Social platforms each have their own audience behavior, content style, and best posting practices.</p>'
              + '<ul>'
              + '<li><strong>Content calendars:</strong> planning posts ahead of time</li>'
              + '<li><strong>Engagement:</strong> replies, shares, and comments that build trust</li>'
              + '<li><strong>Platform fit:</strong> matching content style to each platform</li>'
              + '</ul>'
          },
          {
            id: 'content',
            label: 'Content Strategy',
            title: 'Content Strategy',
            html: ''
              + '<p>Good content strategy means writing with a clear goal — awareness, trust, or conversion — rather than just publishing for the sake of it.</p>'
              + '<div class="tutorial-code-block"><pre>Goal: Drive sign-ups\nFormat: Short how-to post\nCTA: "Try it free today"</pre></div>'
              + '<p>You will practice writing copy with a clear call-to-action attached to every piece you create.</p>'
          },
          {
            id: 'ads',
            label: 'Paid Campaigns',
            title: 'Paid Campaigns',
            html: ''
              + '<p>Paid campaigns let you reach a targeted audience quickly, in exchange for a budget you control directly.</p>'
              + '<ul>'
              + '<li><strong>Targeting:</strong> choosing who sees your ad</li>'
              + '<li><strong>Budgeting:</strong> setting daily or total spend limits</li>'
              + '<li><strong>A/B testing:</strong> comparing two versions of an ad to see which performs better</li>'
              + '</ul>'
          },
          {
            id: 'analytics',
            label: 'Analytics & Reporting',
            title: 'Analytics & Reporting',
            html: ''
              + '<p>Analytics turn guesses into decisions. The numbers you will track most often include:</p>'
              + '<ul>'
              + '<li><strong>Traffic:</strong> how many people visited and where they came from</li>'
              + '<li><strong>Conversion rate:</strong> how many visitors took the action you wanted</li>'
              + '<li><strong>Engagement rate:</strong> how actively your audience interacts with your content</li>'
              + '</ul>'
          },
          {
            id: 'projects',
            label: 'Mini Projects',
            title: 'Mini Projects & Capstone',
            html: ''
              + '<p>Every module in this track ends with something you build, not just something you read. Past student projects from this course have included:</p>'
              + '<ul>'
              + '<li>A full SEO audit and improvement plan for a real page</li>'
              + '<li>A one-month social media content calendar</li>'
              + '<li>A small paid-ad campaign tested with A/B variations</li>'
              + '</ul>'
              + '<p>You\'ll finish the track with a small capstone project of your own, ready to show in interviews.</p>'
          }
        ]
      },

      ai: {
        name: 'Artificial Intelligence',
        sidebarLabel: 'AI TUTORIAL',
        topics: [
          {
            id: 'home',
            label: 'AI HOME',
            title: 'Artificial Intelligence at Intern Crowd',
            html: ''
              + '<p>Welcome to the Intern Crowd Artificial Intelligence track. This page walks you through what the course covers, topic by topic, using the sidebar on the left. Click any topic to jump straight to it.</p>'
              + '<p>AI is the study of building systems that can reason, search, and make decisions — concepts that sit underneath everything from smart assistants to recommendation engines.</p>'
          },
          {
            id: 'intro',
            label: 'AI Intro',
            title: 'What is Artificial Intelligence?',
            html: ''
              + '<p>Artificial Intelligence is the field of building systems that can perform tasks normally associated with human reasoning — like making decisions, recognizing patterns, or holding a conversation.</p>'
              + '<p>In our internship track, AI concepts are used for:</p>'
              + '<ul>'
              + '<li>understanding how intelligent systems make decisions</li>'
              + '<li>exploring search algorithms used in games and planning</li>'
              + '<li>working with basic logic and knowledge representation</li>'
              + '<li>building a foundation for more advanced AI and ML work later</li>'
              + '</ul>'
              + '<h3>Why we teach AI foundations first</h3>'
              + '<ul>'
              + '<li>Core AI concepts explain "why" behind tools that otherwise feel like magic</li>'
              + '<li>It builds logical thinking skills that transfer to every other course</li>'
              + '<li>It sets you up to specialize further in machine learning later, on solid footing</li>'
              + '</ul>'
          },
          {
            id: 'getstarted',
            label: 'AI Get Started',
            title: 'Getting Started',
            html: ''
              + '<p>To start exploring AI, all you need is Python and a code editor — the same setup used in our Python track. In our sessions, you will set this up in the first class with a mentor guiding you step by step.</p>'
              + '<p>Once set up, you will run a simple rule-based program in your very first lesson to see decision-making logic in action.</p>'
          },
          {
            id: 'agents',
            label: 'Intelligent Agents',
            title: 'Intelligent Agents',
            html: ''
              + '<p>An intelligent agent perceives its environment and takes actions to achieve a goal — the core idea behind almost every AI system.</p>'
              + '<ul>'
              + '<li><strong>Perception:</strong> gathering information from the environment</li>'
              + '<li><strong>Reasoning:</strong> deciding what action makes sense</li>'
              + '<li><strong>Action:</strong> carrying out the decision</li>'
              + '</ul>'
          },
          {
            id: 'search',
            label: 'Search Algorithms',
            title: 'Search Algorithms',
            html: ''
              + '<p>Search algorithms help an AI system explore possible solutions to find the best one — used in everything from maps apps to puzzle solvers.</p>'
              + '<div class="tutorial-code-block"><pre>def bfs(start, goal, graph):\n    queue = [start]\n    visited = set()\n    # explore neighbors level by level</pre></div>'
              + '<p>You will implement classic algorithms like breadth-first and depth-first search by hand before relying on any library.</p>'
          },
          {
            id: 'logic',
            label: 'Logic & Reasoning',
            title: 'Logic & Reasoning',
            html: ''
              + '<p>Logic gives AI systems a precise way to represent facts and draw valid conclusions from them.</p>'
              + '<ul>'
              + '<li><strong>Propositional logic:</strong> reasoning with true/false statements</li>'
              + '<li><strong>Rules:</strong> if-this-then-that style knowledge</li>'
              + '<li><strong>Inference:</strong> deriving new facts from known ones</li>'
              + '</ul>'
          },
          {
            id: 'knowledge',
            label: 'Knowledge Representation',
            title: 'Knowledge Representation',
            html: ''
              + '<p>Before a system can reason, it needs a way to store what it knows. A few common approaches include:</p>'
              + '<ul>'
              + '<li><strong>Semantic networks:</strong> concepts linked by relationships</li>'
              + '<li><strong>Decision trees:</strong> branching rules that lead to an outcome</li>'
              + '<li><strong>State spaces:</strong> all possible situations a system could be in</li>'
              + '</ul>'
          },
          {
            id: 'intro-ml-concepts',
            label: 'A Glimpse of Learning Systems',
            title: 'A Glimpse of Learning Systems',
            html: ''
              + '<p>Beyond rule-based reasoning, some AI systems learn patterns directly from data instead of following fixed rules.</p>'
              + '<div class="tutorial-code-block"><pre># Conceptual idea, not full code\nmodel.train(examples)\nmodel.predict(new_input)</pre></div>'
              + '<p>This module gives you just enough intuition to understand how learning-based systems differ from the rule-based ones you have already built.</p>'
          },
          {
            id: 'projects',
            label: 'Mini Projects',
            title: 'Mini Projects & Capstone',
            html: ''
              + '<p>Every module in this track ends with something you build, not just something you read. Past student projects from this course have included:</p>'
              + '<ul>'
              + '<li>A simple maze-solving agent using search algorithms</li>'
              + '<li>A rule-based chatbot for answering FAQs</li>'
              + '<li>A basic tic-tac-toe AI opponent</li>'
              + '</ul>'
              + '<p>You\'ll finish the track with a small capstone project of your own, ready to show in interviews.</p>'
          }
        ]
      }

    };

    var currentCourseKey = 'python';
    var currentIndex = 0;

    function getTopics(){
      return coursesData[currentCourseKey].topics;
    }

    function renderSidebar(){
      sidebar.querySelectorAll('.tutorial-nav-item').forEach(function(el){ el.remove(); });
      getTopics().forEach(function(topic, i){
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tutorial-nav-item' + (i === currentIndex ? ' active' : '');
        btn.textContent = topic.label;
        btn.addEventListener('click', function(){
          currentIndex = i;
          renderAll();
        });
        sidebar.appendChild(btn);
      });
    }

    function renderContent(){
      var topics = getTopics();
      var topic = topics[currentIndex];
      content.innerHTML =
        '<h2 id="tutorial-content-title">' + topic.title + '</h2>'
        + topic.html
        + '<div class="tutorial-footnav">'
        + '<button type="button" id="tutorial-prev"' + (currentIndex === 0 ? ' disabled' : '') + '>'
        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'
        + 'Previous</button>'
        + '<button type="button" id="tutorial-next"' + (currentIndex === topics.length - 1 ? ' disabled' : '') + '>Next'
        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>'
        + '</button>'
        + '</div>';
      content.scrollTop = 0;

      var prevBtn = document.getElementById('tutorial-prev');
      var nextBtn = document.getElementById('tutorial-next');
      if(prevBtn) prevBtn.addEventListener('click', function(){
        if(currentIndex > 0){ currentIndex--; renderAll(); }
      });
      if(nextBtn) nextBtn.addEventListener('click', function(){
        if(currentIndex < getTopics().length - 1){ currentIndex++; renderAll(); }
      });
    }

    function renderAll(){
      renderSidebar();
      renderContent();
    }

    function openTutorial(courseKey){
      if(!coursesData[courseKey]) return;
      currentCourseKey = courseKey;
      currentIndex = 0;
      var course = coursesData[currentCourseKey];
      if(brandText) brandText.textContent = 'Intern Crowd — ' + course.name + ' Tutorial';
      if(sidebarLabel) sidebarLabel.textContent = course.sidebarLabel;
      renderAll();
      overlay.classList.add('open');
      document.body.classList.add('tutorial-locked');
    }

    function closeTutorial(){
      overlay.classList.remove('open');
      document.body.classList.remove('tutorial-locked');
    }

    openBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        var key = btn.getAttribute('data-course');
        if(key && coursesData[key]){
          openTutorial(key);
        }
      });
    });

    closeBtn.addEventListener('click', closeTutorial);
    overlay.addEventListener('click', function(e){
      if(e.target === overlay) closeTutorial();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && overlay.classList.contains('open')) closeTutorial();
    });
  })();
  // FAQ accordion: only one item open at a time
  (function(){
    var faqItems = document.querySelectorAll('#faq-list .faq-item');
    faqItems.forEach(function(item){
      var question = item.querySelector('.faq-question');
      question.addEventListener('click', function(){
        var isOpen = item.classList.contains('open');
        faqItems.forEach(function(i){ i.classList.remove('open'); });
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  })();

  // Contact form: simple confirmation on submit (no backend wired yet)
  (function(){
    var form = document.querySelector('.contact-form-card form');
    if (!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('.form-submit-btn');
      var original = btn.innerHTML;
      btn.innerHTML = 'Message Sent ✓';
      btn.style.background = '#1A3FD6';
      setTimeout(function(){
        btn.innerHTML = original;
        form.reset();
      }, 2200);
    });
  })();