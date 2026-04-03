/* ================================================================
   SubTrack — app.js
   CSE311L — Group 10 | Section 06 | North South University
   ================================================================ */

// ── SERVICE EMOJI MAP ──────────────────────────────────────────
const SVC_ICONS = {
  'Netflix':'🎬','Disney+':'🏰','Hulu':'📺','Spotify Premium':'🎵',
  'Apple Music':'🎶','Onshape':'📐','Adobe Creative Cloud':'🎨',
  'Notion':'📝','Google One':'☁️','Dropbox':'📦',
  'Xbox Game Pass':'🎮','Duolingo Super':'🦜',
  'default':'💳'
};

const CAT_ICONS = {
  'Entertainment':'🎭','Music & Audio':'🎵',
  'Productivity & Design':'💼','Cloud Storage':'☁️',
  'Gaming':'🎮','Education':'📚','default':'📂'
};

// ── DATABASE LAYER (localStorage) ─────────────────────────────
const DB = {

  KEYS: {
    users:'st_users', cats:'st_categories',
    svcs:'st_services', subs:'st_subscriptions',
    session:'st_session', seeded:'st_seeded'
  },

  init() {
    if (localStorage.getItem(this.KEYS.seeded)) return;
    this._seed();
    localStorage.setItem(this.KEYS.seeded, '1');
  },

  _seed() {
    const users = [
      { id:1, name:'Ahsanul Haque',     email:'ahsanul@student.nsu.edu',  password:'demo123', joinDate:'2026-01-15' },
      { id:2, name:'Nafisa Nawal Erisha',email:'erisha@student.nsu.edu',   password:'demo123', joinDate:'2026-01-16' },
      { id:3, name:'John Doe',           email:'john.doe@email.com',        password:'demo123', joinDate:'2026-02-10' },
      { id:4, name:'Jane Smith',         email:'jane.smith@email.com',      password:'demo123', joinDate:'2026-02-22' },
      { id:5, name:'Michael Scott',      email:'mscott@dundermifflin.com',  password:'demo123', joinDate:'2026-03-05' },
      { id:6, name:'Empty Tester',       email:'notrials@email.com',        password:'demo123', joinDate:'2026-03-25' },
    ];
    const cats = [
      { id:1, name:'Entertainment' },
      { id:2, name:'Music & Audio' },
      { id:3, name:'Productivity & Design' },
      { id:4, name:'Cloud Storage' },
      { id:5, name:'Gaming' },
      { id:6, name:'Education' },
    ];
    const svcs = [
      { id:1,  name:'Netflix',              website:'https://www.netflix.com',      catId:1 },
      { id:2,  name:'Disney+',              website:'https://www.disneyplus.com',    catId:1 },
      { id:3,  name:'Hulu',                 website:'https://www.hulu.com',          catId:1 },
      { id:4,  name:'Spotify Premium',      website:'https://www.spotify.com',       catId:2 },
      { id:5,  name:'Apple Music',          website:'https://music.apple.com',       catId:2 },
      { id:6,  name:'Onshape',              website:'https://www.onshape.com',       catId:3 },
      { id:7,  name:'Adobe Creative Cloud', website:'https://www.adobe.com',         catId:3 },
      { id:8,  name:'Notion',               website:'https://www.notion.so',         catId:3 },
      { id:9,  name:'Google One',           website:'https://one.google.com',        catId:4 },
      { id:10, name:'Dropbox',              website:'https://www.dropbox.com',       catId:4 },
      { id:11, name:'Xbox Game Pass',       website:'https://www.xbox.com',          catId:5 },
      { id:12, name:'Duolingo Super',       website:'https://www.duolingo.com',      catId:6 },
    ];
    const subs = [
      { id:1,  amount:15.49, cycle:'Monthly',  nextDate:'2026-05-15', isTrial:false, status:'Active',   userId:1, svcId:1  },
      { id:2,  amount:0.00,  cycle:'14 Days',  nextDate:'2026-04-20', isTrial:true,  status:'Active',   userId:1, svcId:6  },
      { id:3,  amount:10.99, cycle:'Monthly',  nextDate:'2026-02-15', isTrial:false, status:'Canceled', userId:1, svcId:4  },
      { id:4,  amount:13.99, cycle:'Monthly',  nextDate:'2026-05-20', isTrial:false, status:'Active',   userId:2, svcId:2  },
      { id:5,  amount:29.99, cycle:'Yearly',   nextDate:'2027-01-16', isTrial:false, status:'Active',   userId:2, svcId:9  },
      { id:6,  amount:0.00,  cycle:'7 Days',   nextDate:'2026-04-12', isTrial:true,  status:'Active',   userId:2, svcId:12 },
      { id:7,  amount:16.99, cycle:'Monthly',  nextDate:'2026-05-10', isTrial:false, status:'Active',   userId:3, svcId:11 },
      { id:8,  amount:15.49, cycle:'Monthly',  nextDate:'2026-03-10', isTrial:false, status:'Expired',  userId:3, svcId:1  },
      { id:9,  amount:10.99, cycle:'Monthly',  nextDate:'2026-05-10', isTrial:false, status:'Active',   userId:3, svcId:5  },
      { id:10, amount:54.99, cycle:'Monthly',  nextDate:'2026-05-22', isTrial:false, status:'Active',   userId:4, svcId:7  },
      { id:11, amount:100.00,cycle:'Yearly',   nextDate:'2027-02-22', isTrial:false, status:'Active',   userId:4, svcId:8  },
      { id:12, amount:11.99, cycle:'Monthly',  nextDate:'2026-05-22', isTrial:false, status:'Active',   userId:4, svcId:10 },
      { id:13, amount:13.99, cycle:'Monthly',  nextDate:'2026-05-05', isTrial:false, status:'Active',   userId:5, svcId:2  },
      { id:14, amount:7.99,  cycle:'Monthly',  nextDate:'2026-05-05', isTrial:false, status:'Active',   userId:5, svcId:3  },
      { id:15, amount:10.99, cycle:'Monthly',  nextDate:'2026-01-05', isTrial:false, status:'Canceled', userId:5, svcId:4  },
      { id:16, amount:16.99, cycle:'Monthly',  nextDate:'2026-05-05', isTrial:false, status:'Active',   userId:5, svcId:11 },
    ];

    localStorage.setItem(this.KEYS.users, JSON.stringify(users));
    localStorage.setItem(this.KEYS.cats,  JSON.stringify(cats));
    localStorage.setItem(this.KEYS.svcs,  JSON.stringify(svcs));
    localStorage.setItem(this.KEYS.subs,  JSON.stringify(subs));
  },

  // ── USERS ───────────────────────────────────
  getUsers()   { return JSON.parse(localStorage.getItem(this.KEYS.users) || '[]'); },
  getUser(id)  { return this.getUsers().find(u => u.id === id); },

  createUser(data) {
    const users = this.getUsers();
    if (users.find(u => u.email === data.email)) return null;
    const newUser = { id: Date.now(), ...data };
    users.push(newUser);
    localStorage.setItem(this.KEYS.users, JSON.stringify(users));
    return newUser;
  },

  login(email, password) {
    const user = this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) { localStorage.setItem(this.KEYS.session, String(user.id)); return user; }
    return null;
  },

  getCurrentUser() {
    const id = parseInt(localStorage.getItem(this.KEYS.session));
    return id ? this.getUser(id) : null;
  },

  logout() { localStorage.removeItem(this.KEYS.session); },

  // ── CATEGORIES ──────────────────────────────
  getCategories() { return JSON.parse(localStorage.getItem(this.KEYS.cats) || '[]'); },
  getCategory(id) { return this.getCategories().find(c => c.id === id); },

  createCategory(name) {
    const all = this.getCategories();
    const newCat = { id: Date.now(), name: name };
    all.push(newCat);
    localStorage.setItem(this.KEYS.cats, JSON.stringify(all));
    return newCat;
  },

  // ── SERVICES ────────────────────────────────
  getServices()      { return JSON.parse(localStorage.getItem(this.KEYS.svcs) || '[]'); },
  getService(id)     { return this.getServices().find(s => s.id === id); },
  getServicesByCat(catId) { return this.getServices().filter(s => s.catId === catId); },

  createService(data) {
    const all = this.getServices();
    const newSvc = { id: Date.now(), ...data };
    all.push(newSvc);
    localStorage.setItem(this.KEYS.svcs, JSON.stringify(all));
    return newSvc;
  },

  // ── SUBSCRIPTIONS ───────────────────────────
  getSubs(userId)    { return JSON.parse(localStorage.getItem(this.KEYS.subs) || '[]').filter(s => s.userId === userId); },
  getAllSubs()        { return JSON.parse(localStorage.getItem(this.KEYS.subs) || '[]'); },

  createSub(data) {
    const all = this.getAllSubs();
    const newSub = { id: Date.now(), ...data };
    all.push(newSub);
    localStorage.setItem(this.KEYS.subs, JSON.stringify(all));
    return newSub;
  },

  updateSub(id, data) {
    const all = this.getAllSubs();
    const idx = all.findIndex(s => s.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...data };
    localStorage.setItem(this.KEYS.subs, JSON.stringify(all));
    return all[idx];
  },

  deleteSub(id) {
    const all = this.getAllSubs().filter(s => s.id !== id);
    localStorage.setItem(this.KEYS.subs, JSON.stringify(all));
  },

  // ── HELPERS ─────────────────────────────────
  getMonthlyAmount(sub) {
    if (sub.status !== 'Active' || sub.isTrial) return 0;
    if (sub.cycle === 'Monthly') return sub.amount;
    if (sub.cycle === 'Yearly') return sub.amount / 12;
    if (sub.cycle === 'Weekly') return sub.amount * 4.33;
    return sub.amount;
  },

  getMonthlyCost(userId) {
    return this.getSubs(userId).reduce((t, s) => t + this.getMonthlyAmount(s), 0);
  },

  getYearlyCost(userId) { return this.getMonthlyCost(userId) * 12; },

  getActiveTrials(userId) {
    return this.getSubs(userId).filter(s => s.isTrial && s.status === 'Active');
  },

  daysUntil(dateStr) {
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000*60*60*24));
  },
};

// ── TOAST ──────────────────────────────────────────────────────
function toast(msg, type = 'info') {
  const icons = { success:'✅', error:'❌', info:'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ── MODAL ──────────────────────────────────────────────────────
function openModal(titleText, bodyHTML, footerHTML) {
  document.getElementById('modalTitle').textContent = titleText;
  document.getElementById('modalBody').innerHTML = bodyHTML;
  document.getElementById('modalFooter').innerHTML = footerHTML;
  document.getElementById('modalOverlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
}

// ── STATUS BADGE ───────────────────────────────────────────────
function statusBadge(sub) {
  if (sub.isTrial && sub.status === 'Active') return `<span class="badge badge-trial">Free Trial</span>`;
  if (sub.status === 'Active')   return `<span class="badge badge-active">Active</span>`;
  if (sub.status === 'Canceled') return `<span class="badge badge-canceled">Canceled</span>`;
  if (sub.status === 'Expired')  return `<span class="badge badge-expired">Expired</span>`;
  return `<span class="badge">${sub.status}</span>`;
}

// ── ROUTER ─────────────────────────────────────────────────────
const Router = {
  current: 'dashboard',
  go(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const el = document.getElementById(`view-${view}`);
    if (el) el.classList.remove('hidden');
    const nav = document.querySelector(`[data-view="${view}"]`);
    if (nav) nav.classList.add('active');
    this.current = view;
    const titles = {
      dashboard:'Dashboard', subscriptions:'My Subscriptions',
      trials:'Free Trial Tracker', analytics:'Analytics',
      catalog:'Service Catalog'
    };
    document.getElementById('topbarTitle').textContent = titles[view] || 'SubTrack';
    Views[view] && Views[view]();
  }
};

// ── VIEWS ──────────────────────────────────────────────────────
const Views = {

  // ── DASHBOARD ─────────────────────────────────────────────
  dashboard() {
    const user = DB.getCurrentUser();
    const subs     = DB.getSubs(user.id);
    const active   = subs.filter(s => s.status === 'Active' && !s.isTrial);
    const trials   = DB.getActiveTrials(user.id);
    const monthly  = DB.getMonthlyCost(user.id);
    const yearly   = DB.getYearlyCost(user.id);
    const expiring = trials.filter(t => DB.daysUntil(t.nextDate) <= 7);

    document.getElementById('view-dashboard').innerHTML = `
      <div class="page-header">
        <div class="page-title">Welcome back, ${user.name.split(' ')[0]}! 👋</div>
        <div class="page-desc">Here's an overview of your subscriptions as of today.</div>
      </div>

      <div class="stats-grid">
        <div class="stat-card blue">
          <div class="stat-icon blue">📦</div>
          <div class="stat-value">${active.length}</div>
          <div class="stat-label">Active Subscriptions</div>
          <div class="stat-sub">${subs.length} total records</div>
        </div>
        <div class="stat-card green">
          <div class="stat-icon green">💰</div>
          <div class="stat-value">$${monthly.toFixed(2)}</div>
          <div class="stat-label">Monthly Cost</div>
          <div class="stat-sub">Across all active plans</div>
        </div>
        <div class="stat-card amber">
          <div class="stat-icon amber">⏰</div>
          <div class="stat-value">${trials.length}</div>
          <div class="stat-label">Free Trials Running</div>
          <div class="stat-sub">${expiring.length > 0 ? `<span class="text-danger">${expiring.length} expiring within 7 days!</span>` : 'None expiring this week'}</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-icon purple">📅</div>
          <div class="stat-value">$${yearly.toFixed(2)}</div>
          <div class="stat-label">Yearly Total</div>
          <div class="stat-sub">Projected annual spend</div>
        </div>
      </div>

      <div class="two-col">
        <div class="card">
          <div class="card-header">
            <span style="font-size:18px">📋</span>
            <span class="card-title">Recent Subscriptions</span>
            <button class="btn btn-ghost btn-sm ml-auto" onclick="Router.go('subscriptions')">View All</button>
          </div>
          <div class="recent-wrap">
            ${this._recentTable(subs.slice(-5).reverse())}
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <span style="font-size:18px">⏰</span>
            <span class="card-title">Trials Expiring Soon</span>
            <button class="btn btn-ghost btn-sm ml-auto" onclick="Router.go('trials')">View All</button>
          </div>
          <div class="card-body">
            ${this._trialsPreview(trials)}
          </div>
        </div>
      </div>
    `;
  },

  _recentTable(subs) {
    if (!subs.length) return `<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-title">No subscriptions yet</div><div class="empty-desc">Add your first subscription to get started.</div></div>`;
    const rows = subs.map(s => {
      const svc = DB.getService(s.svcId);
      const icon = SVC_ICONS[svc?.name] || SVC_ICONS.default;
      return `<tr>
        <td><div class="svc-row"><div class="svc-icon">${icon}</div><div><div class="svc-name">${svc?.name||'Unknown'}</div></div></div></td>
        <td>${statusBadge(s)}</td>
        <td><span class="amount">${s.amount > 0 ? '$'+s.amount.toFixed(2) : 'Free'}</span></td>
        <td><span class="text-2">${s.cycle}</span></td>
      </tr>`;
    }).join('');
    return `<table class="data-table"><thead><tr><th>Service</th><th>Status</th><th>Amount</th><th>Cycle</th></tr></thead><tbody>${rows}</tbody></table>`;
  },

  _trialsPreview(trials) {
    if (!trials.length) return `<div class="empty-state" style="padding:20px"><div class="empty-icon">🎉</div><div class="empty-title">No active trials</div><div class="empty-desc">You don't have any free trials running.</div></div>`;
    return trials.slice(0,3).map(t => {
      const svc = DB.getService(t.svcId);
      const days = DB.daysUntil(t.nextDate);
      const urgClass = days <= 2 ? 'text-danger' : days <= 5 ? 'text-warn' : 'text-success';
      const icon = SVC_ICONS[svc?.name] || SVC_ICONS.default;
      return `<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)">
        <div class="svc-icon" style="width:36px;height:36px">${icon}</div>
        <div style="flex:1">
          <div style="font-weight:500;font-size:14px">${svc?.name||'Unknown'}</div>
          <div style="font-size:12px;color:var(--text-2)">${new Date(t.nextDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
        </div>
        <div class="amount ${urgClass}" style="font-size:20px">${days}d</div>
      </div>`;
    }).join('');
  },

  // ── SUBSCRIPTIONS ────────────────────────────────────────
  _subFilter: 'All',
  _subSearch: '',

  subscriptions() {
    const user = DB.getCurrentUser();
    const allSubs = DB.getSubs(user.id);

    const filters = ['All','Active','Free Trial','Canceled','Expired'];
    const tabsHTML = filters.map(f => `<button class="filter-tab${this._subFilter===f?' active':''}" onclick="Views._subFilter='${f}';Views.subscriptions()">${f}</button>`).join('');

    let subs = allSubs;
    if (this._subFilter === 'Active')     subs = subs.filter(s => s.status==='Active' && !s.isTrial);
    if (this._subFilter === 'Free Trial') subs = subs.filter(s => s.isTrial && s.status==='Active');
    if (this._subFilter === 'Canceled')   subs = subs.filter(s => s.status==='Canceled');
    if (this._subFilter === 'Expired')    subs = subs.filter(s => s.status==='Expired');
    if (this._subSearch) subs = subs.filter(s => {
      const svc = DB.getService(s.svcId);
      return svc?.name.toLowerCase().includes(this._subSearch.toLowerCase());
    });

    const rows = subs.map(s => {
      const svc = DB.getService(s.svcId);
      const cat = DB.getCategory(svc?.catId);
      const icon = SVC_ICONS[svc?.name] || SVC_ICONS.default;
      const days = DB.daysUntil(s.nextDate);
      const dateColor = s.status==='Active' && days<=7 ? 'text-danger' : 'text-2';
      return `<tr>
        <td>
          <div class="svc-row">
            <div class="svc-icon">${icon}</div>
            <div><div class="svc-name">${svc?.name||'Unknown'}</div><div class="svc-cat">${cat?.name||''}</div></div>
          </div>
        </td>
        <td>${statusBadge(s)}</td>
        <td><span class="amount">${s.amount>0?'$'+s.amount.toFixed(2):'Free'}</span></td>
        <td><span class="text-2">${s.cycle}</span></td>
        <td><span class="${dateColor}" style="font-size:13px">${new Date(s.nextDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span></td>
        <td>
          <div class="flex gap-2">
            <button class="btn btn-ghost btn-sm" onclick="Views._editSub(${s.id})">✏️ Edit</button>
            ${s.status==='Active' ? `<button class="btn btn-danger btn-sm" onclick="Views._cancelSub(${s.id})">Cancel</button>` : `<button class="btn btn-danger btn-sm" onclick="Views._deleteSub(${s.id})">🗑️</button>`}
          </div>
        </td>
      </tr>`;
    }).join('');

    const emptyState = `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📭</div><div class="empty-title">No subscriptions found</div><div class="empty-desc">Try a different filter or add a new subscription.</div></div></td></tr>`;

    document.getElementById('view-subscriptions').innerHTML = `
      <div class="page-header">
        <div class="page-title">My Subscriptions</div>
        <div class="page-desc">Manage all your active plans, trials, and past subscriptions.</div>
      </div>
      <div class="toolbar">
        <div class="filter-tabs">${tabsHTML}</div>
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input class="search-input" placeholder="Search by service..." value="${this._subSearch}"
            oninput="Views._subSearch=this.value;Views.subscriptions()">
        </div>
        <button class="btn btn-primary ml-auto" onclick="Views._addSub()">＋ Add Subscription</button>
      </div>
      <div class="card">
        <div class="recent-wrap">
          <table class="data-table">
            <thead><tr><th>Service</th><th>Status</th><th>Amount</th><th>Cycle</th><th>Next Billing</th><th>Actions</th></tr></thead>
            <tbody>${rows || emptyState}</tbody>
          </table>
        </div>
      </div>
    `;
  },

  _subFormHTML(sub = null) {
    const svcs = DB.getServices();
    const cats = DB.getCategories();
    
    const svcOptions = svcs.map(s => {
      const cat = cats.find(c => c.id === s.catId);
      return `<option value="${s.id}" ${sub?.svcId===s.id?'selected':''}>${SVC_ICONS[s.name]||'💳'} ${s.name} (${cat?.name||''})</option>`;
    }).join('');

    const catOptions = cats.map(c => `<option value="${c.id}">${CAT_ICONS[c.name]||'📂'} ${c.name}</option>`).join('');

    const cycles = ['Monthly','Yearly','Weekly','14 Days','7 Days','30 Days'];
    const cycleOptions = cycles.map(c => `<option ${sub?.cycle===c?'selected':''}>${c}</option>`).join('');
    const statuses = ['Active','Canceled','Expired'];
    const statusOptions = statuses.map(s => `<option ${sub?.status===s?'selected':''}>${s}</option>`).join('');
    
    return `
      <div class="form-group">
        <label class="form-label">Service</label>
        <select id="f-svc" class="form-input" onchange="document.getElementById('f-custom-wrap').classList.toggle('hidden', this.value !== 'custom')">
          <option value="">Select a service...</option>
          ${svcOptions}
          <option value="custom" style="font-weight:600;color:var(--primary)">＋ Add Custom Service...</option>
        </select>

        <div id="f-custom-wrap" class="hidden" style="margin-top:12px; padding:14px; background:var(--card-2); border-radius:var(--radius-sm); border:1px dashed var(--border-2);">
          <div style="margin-bottom:12px;">
            <label class="form-label" style="font-size:12px;">Custom Service Name</label>
            <input id="f-custom-name" type="text" class="form-input" placeholder="e.g., Gym Membership">
          </div>
          <div>
            <label class="form-label" style="font-size:12px;">Category</label>
            <select id="f-custom-cat" class="form-input" onchange="document.getElementById('f-custom-cat-new-wrap').classList.toggle('hidden', this.value !== 'new')">
              ${catOptions}
              <option value="new" style="font-weight:600;color:var(--primary)">＋ Create New Category...</option>
            </select>
          </div>
          <div id="f-custom-cat-new-wrap" class="hidden" style="margin-top:12px;">
            <input id="f-custom-cat-name" type="text" class="form-input" placeholder="New category name (e.g., Health & Fitness)">
          </div>
        </div>
        </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Billing Amount ($)</label>
          <input id="f-amount" type="number" step="0.01" min="0" class="form-input" placeholder="0.00" value="${sub?.amount??''}">
        </div>
        <div class="form-group">
          <label class="form-label">Billing Cycle</label>
          <select id="f-cycle" class="form-input">${cycleOptions}</select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Next Billing / Expiry Date</label>
        <input id="f-date" type="date" class="form-input" value="${sub?.nextDate||''}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Status</label>
          <select id="f-status" class="form-input">${statusOptions}</select>
        </div>
        <div class="form-group" style="padding-top:28px">
          <div class="toggle-wrap">
            <button id="f-trial" class="toggle${sub?.isTrial?' on':''}" onclick="this.classList.toggle('on')"></button>
            <span style="font-size:13px;color:var(--text-2)">This is a Free Trial</span>
          </div>
        </div>
      </div>
    `;
  },

  _addSub() {
    openModal('Add New Subscription', this._subFormHTML(), `
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="Views._saveSub()">Save Subscription</button>
    `);
  },

  _editSub(id) {
    const sub = DB.getAllSubs().find(s => s.id === id);
    if (!sub) return;
    openModal('Edit Subscription', this._subFormHTML(sub), `
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="Views._saveSub(${id})">Save Changes</button>
    `);
  },

  _saveSub(id = null) {
    let svcId  = document.getElementById('f-svc').value;
    const amount = parseFloat(document.getElementById('f-amount').value);
    const cycle  = document.getElementById('f-cycle').value;
    const date   = document.getElementById('f-date').value;
    const status = document.getElementById('f-status').value;
    const trial  = document.getElementById('f-trial').classList.contains('on');

    if (!svcId) { toast('Please select a service.', 'error'); return; }

    if (svcId === 'custom') {
      const customName = document.getElementById('f-custom-name').value.trim();
      if (!customName) { toast('Please enter a name for the custom service.', 'error'); return; }

      let customCatId = document.getElementById('f-custom-cat').value;
      
      // Handle new category creation
      if (customCatId === 'new') {
        const newCatName = document.getElementById('f-custom-cat-name').value.trim();
        if (!newCatName) { toast('Please enter a name for the new category.', 'error'); return; }
        const newCat = DB.createCategory(newCatName);
        customCatId = newCat.id;
      } else {
        customCatId = parseInt(customCatId);
      }

      // Create the new service mapped to the selected/new category
      const newSvc = DB.createService({ name: customName, website: '', catId: customCatId });
      svcId = newSvc.id;
    } else {
      svcId = parseInt(svcId);
    }

    if (isNaN(amount)) { toast('Please enter a valid amount.', 'error'); return; }
    if (!date) { toast('Please enter a date.', 'error'); return; }

    const data = { svcId, amount, cycle, nextDate: date, status, isTrial: trial, userId: DB.getCurrentUser().id };
    if (id) { DB.updateSub(id, data); toast('Subscription updated!', 'success'); }
    else    { DB.createSub(data);    toast('Subscription added!',   'success'); }
    closeModal();
    this._updateTrialBadge();
    this.subscriptions();
  },

  _cancelSub(id) {
    DB.updateSub(id, { status: 'Canceled' });
    toast('Subscription marked as canceled.', 'info');
    this._updateTrialBadge();
    this.subscriptions();
  },

  _deleteSub(id) {
    DB.deleteSub(id);
    toast('Subscription deleted.', 'info');
    this._updateTrialBadge();
    this.subscriptions();
  },

  _updateTrialBadge() {
    const user = DB.getCurrentUser();
    const count = DB.getActiveTrials(user.id).length;
    const badge = document.getElementById('trialBadge');
    if (badge) { badge.textContent = count; badge.classList.toggle('hide', count === 0); }
  },

  // ── FREE TRIALS ──────────────────────────────────────────
  trials() {
    const user   = DB.getCurrentUser();
    const trials = DB.getActiveTrials(user.id).sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate));

    const expiring7 = trials.filter(t => DB.daysUntil(t.nextDate) <= 7);

    const cards = trials.length ? trials.map(t => {
      const svc  = DB.getService(t.svcId);
      const cat  = DB.getCategory(svc?.catId);
      const icon = SVC_ICONS[svc?.name] || SVC_ICONS.default;
      const days = DB.daysUntil(t.nextDate);
      const urgClass = days <= 2 ? 'urgent' : days <= 7 ? 'warn' : '';
      const pctLeft  = Math.min(100, Math.max(0, (days / 30) * 100));
      const barClass = days <= 2 ? 'progress-urgent' : days <= 7 ? 'progress-warn' : 'progress-good';
      const dayColor = days <= 2 ? 'var(--danger)' : days <= 7 ? 'var(--warning)' : 'var(--success)';
      return `
        <div class="trial-card ${urgClass}">
          <div class="trial-header">
            <div class="svc-row">
              <div class="svc-icon" style="width:42px;height:42px;font-size:20px">${icon}</div>
              <div>
                <div style="font-weight:600;font-size:15px">${svc?.name||'Unknown'}</div>
                <span class="badge badge-cat">${cat?.name||''}</span>
              </div>
            </div>
            <div style="text-align:right">
              <div class="trial-expiry">Expires</div>
              <div style="font-size:13px;font-weight:500">${new Date(t.nextDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
            </div>
          </div>
          <div style="text-align:center;padding:8px 0">
            <div class="trial-days-big" style="color:${dayColor}">${Math.max(0,days)}</div>
            <div class="trial-days-label">days remaining</div>
          </div>
          <div class="trial-progress"><div class="trial-progress-bar ${barClass}" style="width:${pctLeft}%"></div></div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn-ghost btn-sm" style="flex:1" onclick="Views._editSub(${t.id})">✏️ Edit</button>
            <button class="btn btn-danger btn-sm" style="flex:1" onclick="Views._cancelSub(${t.id});Router.go('trials')">Cancel Trial</button>
          </div>
        </div>`;
    }).join('') : '';

    document.getElementById('view-trials').innerHTML = `
      <div class="page-header">
        <div class="page-title">Free Trial Tracker ⏰</div>
        <div class="page-desc">Monitor all your active free trials sorted by expiry date. Cancel before they charge you!</div>
      </div>
      ${expiring7.length > 0 ? `
        <div style="background:var(--danger-g);border:1px solid rgba(239,68,68,0.25);border-radius:var(--radius);padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;gap:12px">
          <span style="font-size:22px">🚨</span>
          <div>
            <div style="font-weight:600;color:var(--danger)">Urgent: ${expiring7.length} trial${expiring7.length>1?'s':''} expiring within 7 days!</div>
            <div style="font-size:13px;color:var(--text-2);margin-top:2px">Cancel them now to avoid unwanted charges.</div>
          </div>
        </div>` : ''}
      ${trials.length ? `<div class="trials-grid">${cards}</div>` : `
        <div class="empty-state">
          <div class="empty-icon">🎉</div>
          <div class="empty-title">No active free trials</div>
          <div class="empty-desc">You're not enrolled in any free trials right now. Explore the service catalog to find new ones!</div>
          <button class="btn btn-primary" onclick="Router.go('catalog')">Browse Service Catalog</button>
        </div>`}
    `;
  },

  // ── ANALYTICS ────────────────────────────────────────────
  _chartInstances: {},

  analytics() {
    const user  = DB.getCurrentUser();
    const subs  = DB.getSubs(user.id).filter(s => s.status === 'Active');
    const cats  = DB.getCategories();
    const svcs  = DB.getServices();
    const monthly = DB.getMonthlyCost(user.id);
    const yearly  = DB.getYearlyCost(user.id);
    const weekly  = monthly / 4.33;

    const catCosts = {};
    subs.forEach(s => {
      const svc = DB.getService(s.svcId);
      const cat = DB.getCategory(svc?.catId);
      const key = cat?.name || 'Other';
      catCosts[key] = (catCosts[key] || 0) + DB.getMonthlyAmount(s);
    });

    const catColors = ['#4F8BF9','#22C55E','#F59E0B','#A855F7','#EF4444','#06B6D4','#FF8C42'];
    const catNames  = Object.keys(catCosts);
    const catVals   = Object.values(catCosts);

    const cycleCosts = {};
    subs.forEach(s => { if (!s.isTrial) cycleCosts[s.cycle] = (cycleCosts[s.cycle]||0) + DB.getMonthlyAmount(s); });

    document.getElementById('view-analytics').innerHTML = `
      <div class="page-header">
        <div class="page-title">Expense Analytics 📊</div>
        <div class="page-desc">Understand where your subscription money goes.</div>
      </div>
      <div class="stats-grid" style="margin-bottom:24px">
        <div class="stat-card blue">
          <div class="stat-icon blue">📅</div>
          <div class="stat-value">$${weekly.toFixed(2)}</div>
          <div class="stat-label">Weekly Spend</div>
        </div>
        <div class="stat-card green">
          <div class="stat-icon green">🗓️</div>
          <div class="stat-value">$${monthly.toFixed(2)}</div>
          <div class="stat-label">Monthly Spend</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-icon purple">📆</div>
          <div class="stat-value">$${yearly.toFixed(2)}</div>
          <div class="stat-label">Yearly Projection</div>
        </div>
        <div class="stat-card amber">
          <div class="stat-icon amber">📦</div>
          <div class="stat-value">${subs.filter(s=>!s.isTrial).length}</div>
          <div class="stat-label">Paid Active Plans</div>
        </div>
      </div>
      <div class="analytics-grid">
        <div class="card">
          <div class="card-header"><span style="font-size:18px">🍩</span><span class="card-title">Cost by Category</span></div>
          <div class="card-body">
            <div class="chart-container"><canvas id="catChart"></canvas></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span style="font-size:18px">📊</span><span class="card-title">Cost Breakdown</span></div>
          <div class="card-body">
            ${catNames.length ? catNames.map((n,i) => `
              <div class="cost-row" style="padding:8px 0;border-bottom:1px solid var(--border)">
                <div class="cost-dot" style="background:${catColors[i%catColors.length]}"></div>
                <div class="cost-cat">${n}</div>
                <div class="cost-pct">${((catVals[i]/monthly)*100||0).toFixed(1)}%</div>
                <div class="cost-val">$${catVals[i].toFixed(2)}/mo</div>
              </div>`) .join('') : '<div class="text-muted" style="text-align:center;padding:20px">No active paid subscriptions.</div>'}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span style="font-size:18px">📈</span><span class="card-title">Cost by Billing Cycle</span></div>
          <div class="card-body">
            <div class="chart-container"><canvas id="cycleChart"></canvas></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span style="font-size:18px">📋</span><span class="card-title">All Active Subscriptions</span></div>
          <div class="recent-wrap">
            <table class="data-table">
              <thead><tr><th>Service</th><th>Monthly ($)</th><th>Cycle</th></tr></thead>
              <tbody>
                ${subs.filter(s=>!s.isTrial).map(s => {
                  const svc = DB.getService(s.svcId);
                  return `<tr><td><div class="svc-row"><div class="svc-icon">${SVC_ICONS[svc?.name]||'💳'}</div><div class="svc-name">${svc?.name||'Unknown'}</div></div></td><td><span class="amount">$${DB.getMonthlyAmount(s).toFixed(2)}</span></td><td><span class="text-2">${s.cycle}</span></td></tr>`;
                }).join('') || '<tr><td colspan="3"><div class="empty-state" style="padding:20px"><div class="empty-desc">No paid subscriptions.</div></div></td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    if (this._chartInstances.cat) this._chartInstances.cat.destroy();
    if (this._chartInstances.cycle) this._chartInstances.cycle.destroy();

    if (catNames.length) {
      this._chartInstances.cat = new Chart(document.getElementById('catChart'), {
        type: 'doughnut',
        data: { labels: catNames, datasets: [{ data: catVals, backgroundColor: catColors.slice(0,catNames.length), borderWidth:0, hoverOffset:6 }] },
        options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ color:'#8892A4', font:{size:12}, padding:16 } } }, cutout:'65%' }
      });
    }

    if (Object.keys(cycleCosts).length) {
      this._chartInstances.cycle = new Chart(document.getElementById('cycleChart'), {
        type: 'bar',
        data: {
          labels: Object.keys(cycleCosts),
          datasets: [{ label: 'Monthly equivalent ($)', data: Object.values(cycleCosts), backgroundColor: 'rgba(79,139,249,0.7)', borderRadius:6, borderSkipped:false }]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ labels:{ color:'#8892A4' } } },
          scales:{ x:{ grid:{ color:'rgba(255,255,255,0.04)' }, ticks:{ color:'#8892A4' } }, y:{ grid:{ color:'rgba(255,255,255,0.04)' }, ticks:{ color:'#8892A4', callback:v=>'$'+v } } }
        }
      });
    }
  },

  // ── SERVICE CATALOG ──────────────────────────────────────
  _catFilter: 0,

  catalog() {
    const cats = DB.getCategories();
    const svcs = this._catFilter ? DB.getServicesByCat(this._catFilter) : DB.getServices();
    const user = DB.getCurrentUser();
    const mySvcIds = new Set(DB.getSubs(user.id).filter(s=>s.status==='Active').map(s=>s.svcId));

    const catTabs = `<button class="filter-tab${this._catFilter===0?' active':''}" onclick="Views._catFilter=0;Views.catalog()">All</button>` +
      cats.map(c => `<button class="filter-tab${this._catFilter===c.id?' active':''}" onclick="Views._catFilter=${c.id};Views.catalog()">${CAT_ICONS[c.name]||'📂'} ${c.name}</button>`).join('');

    const cards = svcs.map(s => {
      const cat  = DB.getCategory(s.catId);
      const icon = SVC_ICONS[s.name] || SVC_ICONS.default;
      const catIcon = CAT_ICONS[cat?.name] || '📂';
      const subscribed = mySvcIds.has(s.id);
      return `
        <div class="catalog-card">
          <div class="catalog-header">
            <div class="catalog-icon">${icon}</div>
            <div>
              <div class="catalog-name">${s.name}</div>
              <a href="${s.website}" target="_blank" rel="noopener" class="catalog-url">${s.website.replace('https://','')}</a>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="badge badge-cat">${catIcon} ${cat?.name||''}</span>
            ${subscribed ? `<span class="badge badge-active" style="margin-left:auto">✓ Subscribed</span>` : ''}
          </div>
          ${!subscribed ? `<button class="btn btn-primary btn-sm" onclick="Views._quickAddFromCatalog(${s.id})">＋ Add to My Subscriptions</button>` : `<button class="btn btn-ghost btn-sm" onclick="Router.go('subscriptions')" style="pointer-events:auto">View My Plans</button>`}
        </div>`;
    }).join('');

    document.getElementById('view-catalog').innerHTML = `
      <div class="page-header">
        <div class="page-title">Service Catalog 🛍️</div>
        <div class="page-desc">Browse ${DB.getServices().length} services across ${cats.length} categories. Click to add a subscription.</div>
      </div>
      <div class="toolbar">
        <div class="filter-tabs" style="flex-wrap:wrap">${catTabs}</div>
      </div>
      <div class="catalog-grid">${cards || '<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-title">No services found</div></div>'}</div>
    `;
  },

  _quickAddFromCatalog(svcId) {
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+14);
    const dateStr  = tomorrow.toISOString().split('T')[0];
    const sub      = { svcId, amount: 0, cycle: 'Monthly', nextDate: dateStr, isTrial: false, status: 'Active' };
    openModal('Add Subscription', Views._subFormHTML({...sub, svcId}), `
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="Views._saveSub()">Save Subscription</button>
    `);
  },
};

// ── AUTH ───────────────────────────────────────────────────────
function showAuth()  { document.getElementById('authScreen').classList.remove('hidden'); document.getElementById('appScreen').classList.add('hidden'); }
function showApp()   { document.getElementById('authScreen').classList.add('hidden'); document.getElementById('appScreen').classList.remove('hidden'); }

function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  if (!email || !pass) { toast('Please fill in all fields.', 'error'); return; }
  const user = DB.login(email, pass);
  if (user) {
    toast(`Welcome back, ${user.name.split(' ')[0]}! 👋`, 'success');
    showApp();
    renderSidebar();
    Router.go('dashboard');
  } else {
    toast('Invalid email or password.', 'error');
  }
}

function handleRegister() {
  const name  = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass  = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;
  if (!name || !email || !pass) { toast('Please fill in all fields.', 'error'); return; }
  if (pass !== pass2) { toast('Passwords do not match.', 'error'); return; }
  if (pass.length < 6) { toast('Password must be at least 6 characters.', 'error'); return; }
  const user = DB.createUser({ name, email, password: pass, joinDate: new Date().toISOString().split('T')[0] });
  if (!user) { toast('An account with this email already exists.', 'error'); return; }
  DB.login(email, pass);
  toast(`Account created! Welcome, ${name.split(' ')[0]}! 🎉`, 'success');
  showApp();
  renderSidebar();
  Router.go('dashboard');
}

function renderSidebar() {
  const user   = DB.getCurrentUser();
  const trials = DB.getActiveTrials(user.id).length;
  document.getElementById('sidebarUserName').textContent  = user.name;
  document.getElementById('sidebarUserEmail').textContent = user.email;
  document.getElementById('sidebarAvatar').textContent    = user.name[0].toUpperCase();
  const badge = document.getElementById('trialBadge');
  if (badge) { badge.textContent = trials; badge.classList.toggle('hide', trials === 0); }
}

function handleLogout() {
  DB.logout();
  toast('Logged out successfully.', 'info');
  showAuth();
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPass').value = '';
}

// ── INIT ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  DB.init();
  const user = DB.getCurrentUser();
  if (user) { showApp(); renderSidebar(); Router.go('dashboard'); }
  else       { showAuth(); }

  // Enter key on login
  document.getElementById('loginPass')?.addEventListener('keydown', e => { if (e.key==='Enter') handleLogin(); });

  // Close modal on overlay click
  document.getElementById('modalOverlay')?.addEventListener('click', e => { if (e.target.id==='modalOverlay') closeModal(); });
});