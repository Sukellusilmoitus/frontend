# Sukellusilmotus frontend

[![GitHub Actions](https://github.com/Sukellusilmoitus/frontend/workflows/CI/badge.svg)](https://github.com/Sukellusilmoitus/frontend/actions)
[![codecov](https://codecov.io/gh/Sukellusilmoitus/frontend/branch/master/graph/badge.svg)](https://app.codecov.io/gh/Sukellusilmoitus/frontend)

Frontend _Sukellusilmoitus_-verkkosivulle, jonka löydät [täältä](https://sukellusilmoitus.herokuapp.com/).

## Asennus

Vaatii Noden version 16 tai uudemman ja npm:n.

Paikallista kehittämistä varten lisää seuraavanlainen `.env.local` projektin juureen. Vaatii toimiakseen [backendin](https://github.com/Sukellusilmoitus/backend), jonka on oletusarvoisesti saavutettavissa portista 5000.
```
REACT_APP_SERVER_URL=http://localhost:5000
```

Käynnistys tapahtuu komennoilla

```bash
npm install
npm start
```
ja käynnistyy portissa 3000 paikallisesti.

## Komentoja
### Testaus
Frontin testejä ajaessa voi käyttää myös suoraan herokun testiserveriä, kuten Githubin CI tekee. Jos .env.local tiedoston poistaa niin automaattisesti `npm start` sekä `npm test` käyttävät backina herokun sukellusilmo-back-test -serveriä. 

Yksikköstetit:

```bash
npm test
```

E2e-testit
```bash
npm run cypress:run
```

### ESLint
```bash
npm run lint
```

## Definition of done
Scrumin mukaisesti projektissa toteutetaan backlogista löytyvät user storyt, 
joille on jokaiselle määritelty hyväksymiskriteerit.
Projektin product- ja sprint-backlogit ja siten myös hyväksymiskriteerit löytyvät tästä sheetistä: [backlogit](https://helsinkifi-my.sharepoint.com/:x:/g/personal/amikko_ad_helsinki_fi/EaUHpV9XQy1BmeSrSOFVoi8BKp4hDY_YXGRn8sG6nbl1oA?rtime=T01JVzDb2Ug)

Hyväksymiskriteerit testataan käyttäen Cypressia.
Koodia testataan kattavasti myös unit testeillä.
Koodityyli noudattaa lintin avulla määriteltyjä sääntöjä.

Asiakas voi seurata koodin ja testien tilannetta CI-palvelusta:
* Frontend: [codecov](https://app.codecov.io/gh/Sukellusilmoitus/frontend)
* Backend: [codecov](https://app.codecov.io/gh/Sukellusilmoitus/backend)

Koodin arkkitehtuuri on suunniteltua ja perusteltua,
pyrkimyksenä on mahdollisimman hyvä ylläpidettävyys pitämällä koodi selkeänä.

### Tarkistuslista User Storylle
* Tuotettu koodia suunnitelluille toiminnallisuuksille
* User storyn vaatimuksiin vastattu
* Projekti käynnistyy ilman virheitä
* Unit testit kirjoitettu ja läpäisty
* Toiminnallisuus on testattu hyväksymistesteillä
* Refraktorointi on valmis
* Product ownerin mielestä toiminnallisuus on valmis

### Tarkistuslista Sprintille
* Definition of done sprintin user storyille täytetty
* Kaikki unit testit läpäisty
* Linttaus läpäisty
* Backlog on päivitetty
* Kaikki bugit on korjattu
* Sprintin toteutettu toiminallisuus käyty läpi Product Ownerin kanssa
* Sprinttiin liittyvät "to do" asiat valmiita

### Tarkistuslista viimeiselle Releaselle
* Koodi on valmista
* Kaikki testit läpäisevät
* Kaikki hyväksymiskriteerit täyttyvät
* Ryhmä on hyväksynyt releasen
* Ei keskeneräistä työtä releasen mukana
* Kaikki DoD asetetut vaatimukset täyttyvät
