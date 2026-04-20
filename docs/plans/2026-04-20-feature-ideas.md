# Idées de Features - Session 20 avril 2026

Liste des features proposées pour le DJ mixer. À creuser une par une.

## Features

### 1. Favoris / Bookmarks de la librairie
- Marquer/unmarquer des fichiers de la librairie pour les retrouver facilement
- Afficher les favoris dans un onglet dédié pendant la session
- Permet un accès rapide aux tracks sans scroller la liste complète
- **Contexte**: Utile quand on crée une mix, pour isoler les tracks à utiliser

**Raccourcis clavier:**
- `s` : marquer une track
- `S` (Shift+s) : démarquer une track
- Appuyer rapidement sur `s` plusieurs fois = cycle entre 5 couleurs de marques
- Chaque couleur correspond à une playlist différente (5 playlists max)

### 2. Palette de commande (Command Palette)
- Interface de recherche rapide comme dans VS Code
- Accès à toutes les commandes principales de l'app (play, pause, search, etc.)
- **Raccourci**: Cmd+K (ou Ctrl+K sur Windows/Linux)
- Permet une navigation sans souris

### 3. Fullscreen Library Search
- Affiche la librairie en fullscreen pour une recherche rapide
- **Raccourci**: `%L` (Shift+5, puis L)
- **Fermer**: ESC
- Utile pour trouver une track rapidement sans distractions

> ⚠️ **Note (2026-04-20)**: Fullscreen Library Search déjà implémentée avec Shift+B (toggle),
> ↑/↓ pour naviguer, Enter pour charger, Escape pour fermer. Le raccourci `%L` est donc différent
> de ce qui est en prod. À réconcilier si besoin.

### utiliser des composants react existants

---

## Bugs à corriger

### BUG: Calcul du BPM ne fonctionne pas
- Le BPM reste "—" dans l'interface
- MusicTempo est chargé depuis CDN (music-tempo@1.0.3)
- Probable cause: audioBuffer invalide ou MusicTempo échoue silencieusement
- Need diagnostic: ajouter du logging pour voir l'erreur

---

## Status
- [ ] Favoris / Bookmarks de la librairie
- [ ] Palette de commande
- [ ] Fullscreen Library Search (⚠️ déjà partiellement fait — voir note ci-dessus)

## Bugs Status
- [ ] BUG: Calcul du BPM ne fonctionne pas
