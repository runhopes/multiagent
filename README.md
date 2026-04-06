# agent chain

3 AI agent, tek pipeline: **Yönetici** planlar → **Kodcu** yazar → **Analist** inceler.

Agent Chaining mantığıyla çalışan multi-agent orkestrasyon sistemi. Her ajanın çıktısı bir sonrakine context olarak verilir — tek bir modele "şunu yap" demekten çok daha kaliteli sonuç üretir.

---

## Kurulum

```bash
git clone https://github.com/runhopes/multiagent.git
cd multiagent
npm install
npm run dev
```

Tarayıcınızda `http://localhost:3000` açılacak.

---

## Kullanım

1. Anthropic API anahtarınızı girin
2. Bir görev yazın (örn: *"Python'da hesap makinesi yaz"*)
3. **Başlat** butonuna basın
4. 3 agent sırayla çalışsın, izleyin

### API anahtarı nereden alınır?

[console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

---

## Mimari

```
Kullanıcı görevi yazar
        │
        ▼
  ┌───────────┐     ┌───────────┐     ┌───────────┐
  │  Yönetici │ ──▶ │   Kodcu   │ ──▶ │  Analist  │
  │  (Plan)   │     │   (Kod)   │     │ (İnceleme)│
  └───────────┘     └───────────┘     └───────────┘
```

Her agent bir öncekinin çıktısını context olarak alır. Bu yaklaşıma **Agent Chaining** denir.

---

## Proje yapısı

```
agent-chain/
├── src/
│   ├── components/
│   │   ├── Panel.jsx          # Agent panel bileşeni
│   │   └── ApiKeyScreen.jsx   # API key giriş ekranı
│   ├── config/
│   │   └── roles.js           # Agent tanımları ve system prompt'lar
│   ├── utils/
│   │   └── api.js             # Claude API çağrısı
│   ├── App.jsx                # Ana uygulama + pipeline mantığı
│   ├── main.jsx               # React entry point
│   └── index.css              # Global stiller
├── index.html
├── package.json
└── vite.config.js
```

---

## Güvenlik

- API anahtarınız **sadece tarayıcınızın localStorage'ında** saklanır
- Hiçbir sunucuya veya üçüncü partiye gönderilmez
- "Çıkış" butonuyla silebilirsiniz
- Tamamen client-side, backend yok

---

## Özelleştirme

### Model değiştirmek

`src/config/roles.js` dosyasındaki `model` alanını değiştirin:

```javascript
manager: {
  model: "claude-opus-4-6",  // daha güçlü ama yavaş
  ...
}
```

### Yeni agent eklemek

1. `src/config/roles.js` → yeni rol ekleyin
2. `src/App.jsx` → `run()` fonksiyonuna yeni adımı ekleyin
3. `src/App.jsx` → paneller arasına yeni `<Panel>` ekleyin

### System prompt düzenlemek

`src/config/roles.js` içindeki `systemPrompt` alanlarını düzenleyin.

---

## Teknolojiler

- React 18
- Vite
- Anthropic Claude API

---
