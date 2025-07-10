import { Injectable } from '@angular/core';

export interface BibleVerse {
  reference: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  private verses: BibleVerse[] = [
    { reference: 'Jeremiah 29:11', text: 'For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.' },
    { reference: 'Philippians 4:13', text: 'I can do all things through him who strengthens me.' },
    { reference: 'Isaiah 40:31', text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.' },
    { reference: 'Romans 8:28', text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.' },
    { reference: 'Proverbs 3:5-6', text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.' },
    { reference: 'Joshua 1:9', text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.' },
    { reference: 'Psalm 23:4', text: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.' },
    { reference: '2 Timothy 1:7', text: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.' },
    { reference: 'Matthew 11:28', text: 'Come to me, all you who are weary and burdened, and I will give you rest.' },
    { reference: 'Psalm 46:1', text: 'God is our refuge and strength, an ever-present help in trouble.' },
    { reference: 'Deuteronomy 31:6', text: 'Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.' },
    { reference: 'Romans 12:12', text: 'Be joyful in hope, patient in affliction, faithful in prayer.' },
    { reference: 'Psalm 121:1-2', text: 'I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.' },
    { reference: 'Isaiah 41:10', text: 'So do not fear, for I am with you; do not be dismayed, for I am your God.' },
    { reference: 'John 16:33', text: 'In this world you will have trouble. But take heart! I have overcome the world.' },
    { reference: 'Psalm 27:1', text: 'The Lord is my light and my salvation—whom shall I fear?' },
    { reference: '1 Peter 5:7', text: 'Cast all your anxiety on him because he cares for you.' },
    { reference: 'Hebrews 13:5', text: 'Never will I leave you; never will I forsake you.' },
    { reference: 'Lamentations 3:22-23', text: 'Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning.' },
    { reference: 'Galatians 6:9', text: 'Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.' },
    { reference: 'Psalm 34:17-18', text: 'The righteous cry out, and the Lord hears them; he delivers them from all their troubles.' },
    { reference: 'James 1:12', text: 'Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life.' },
    { reference: 'Matthew 6:33', text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.' },
    { reference: '1 Corinthians 16:13', text: 'Be on your guard; stand firm in the faith; be courageous; be strong.' },
    { reference: 'Romans 15:13', text: 'May the God of hope fill you with all joy and peace as you trust in him.' },
    { reference: '2 Corinthians 12:9', text: 'My grace is sufficient for you, for my power is made perfect in weakness.' },
    { reference: 'Psalm 31:24', text: 'Be strong and take heart, all you who hope in the Lord.' },
    { reference: 'Isaiah 43:2', text: 'When you pass through the waters, I will be with you.' },
    { reference: 'Ephesians 6:10', text: 'Be strong in the Lord and in his mighty power.' },
    { reference: 'Proverbs 18:10', text: 'The name of the Lord is a fortified tower; the righteous run to it and are safe.' },
    { reference: 'Psalm 91:1', text: 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.' },
    { reference: 'Romans 5:3-4', text: 'We also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope.' },
    { reference: 'Colossians 3:2', text: 'Set your minds on things above, not on earthly things.' },
    { reference: 'John 14:27', text: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives.' },
    { reference: 'Isaiah 26:3', text: 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.' },
    { reference: 'Psalm 16:8', text: 'I keep my eyes always on the Lord. With him at my right hand, I will not be shaken.' },
    { reference: 'James 1:5', text: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.' },
    { reference: '1 Thessalonians 5:16-18', text: 'Rejoice always, pray continually, give thanks in all circumstances.' },
    { reference: 'Psalm 37:4', text: 'Take delight in the Lord, and he will give you the desires of your heart.' },
    { reference: 'Micah 6:8', text: 'Act justly and to love mercy and to walk humbly with your God.' },
    { reference: 'Isaiah 40:29', text: 'He gives strength to the weary and increases the power of the weak.' },
    { reference: '2 Corinthians 4:8-9', text: 'We are hard pressed on every side, but not crushed; perplexed, but not in despair.' },
    { reference: 'Hebrews 11:1', text: 'Now faith is confidence in what we hope for and assurance about what we do not see.' },
    { reference: 'Psalm 94:19', text: 'When anxiety was great within me, your consolation brought me joy.' },
    { reference: 'Matthew 19:26', text: 'With man this is impossible, but with God all things are possible.' },
    { reference: '1 John 4:4', text: 'The one who is in you is greater than the one who is in the world.' },
    { reference: 'John 15:5', text: 'Apart from me you can do nothing.' },
    { reference: 'Psalm 28:7', text: 'The Lord is my strength and my shield; my heart trusts in him, and he helps me.' },
    { reference: 'Proverbs 16:3', text: 'Commit to the Lord whatever you do, and he will establish your plans.' },
    { reference: 'Romans 8:31', text: 'If God is for us, who can be against us?' },
    { reference: 'Philippians 1:6', text: 'He who began a good work in you will carry it on to completion.' },
    { reference: 'Psalm 112:7', text: 'They will have no fear of bad news; their hearts are steadfast, trusting in the Lord.' },
    { reference: 'Nahum 1:7', text: 'The Lord is good, a refuge in times of trouble. He cares for those who trust in him.' },
    { reference: 'Isaiah 54:17', text: 'No weapon formed against you shall prevail.' },
    { reference: 'Mark 10:27', text: 'With God all things are possible.' },
    { reference: '2 Corinthians 5:7', text: 'For we live by faith, not by sight.' },
    { reference: 'Psalm 30:5', text: 'Weeping may stay for the night, but rejoicing comes in the morning.' },
    { reference: 'James 4:7', text: 'Submit yourselves, then, to God. Resist the devil, and he will flee from you.' },
    { reference: '1 Chronicles 16:11', text: 'Look to the Lord and his strength; seek his face always.' },
    { reference: 'Romans 12:21', text: 'Do not be overcome by evil, but overcome evil with good.' },
    { reference: 'Hebrews 10:23', text: 'Let us hold unswervingly to the hope we profess, for he who promised is faithful.' },
    { reference: '1 Corinthians 10:13', text: 'God is faithful; he will not let you be tempted beyond what you can bear.' },
    { reference: 'Isaiah 58:11', text: 'The Lord will guide you always; he will satisfy your needs in a sun-scorched land.' },
    { reference: 'Psalm 19:14', text: 'May these words of my mouth and this meditation of my heart be pleasing in your sight, Lord.' },
    { reference: 'Matthew 5:16', text: 'Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.' },
    { reference: '2 Thessalonians 3:3', text: 'But the Lord is faithful, and he will strengthen you and protect you from the evil one.' },
    { reference: 'Psalm 138:8', text: 'The Lord will fulfill his purpose for me; your steadfast love, O Lord, endures forever.' },
    { reference: 'Luke 1:37', text: 'For no word from God will ever fail.' },
    { reference: 'Romans 10:17', text: 'Faith comes from hearing the message, and the message is heard through the word about Christ.' },
    { reference: 'Psalm 55:22', text: 'Cast your cares on the Lord and he will sustain you.' },
    { reference: 'Ephesians 3:20', text: 'Now to him who is able to do immeasurably more than all we ask or imagine.' },
    { reference: '1 Peter 1:6-7', text: 'These have come so that the proven genuineness of your faith... may result in praise, glory and honor.' },
    { reference: 'Matthew 21:22', text: 'If you believe, you will receive whatever you ask for in prayer.' },
    { reference: 'Galatians 2:20', text: 'I have been crucified with Christ and I no longer live, but Christ lives in me.' },
    { reference: 'Psalm 103:2-5', text: 'Praise the Lord, my soul, and forget not all his benefits... who satisfies your desires with good things.' },
    { reference: 'Isaiah 43:1', text: 'Do not fear, for I have redeemed you; I have summoned you by name; you are mine.' },
    { reference: 'Job 23:10', text: 'But he knows the way that I take; when he has tested me, I will come forth as gold.' },
    { reference: 'Psalm 118:6', text: 'The Lord is with me; I will not be afraid.' },
    { reference: 'Ecclesiastes 3:1', text: 'There is a time for everything, and a season for every activity under the heavens.' },
    { reference: 'Romans 15:5', text: 'May the God who gives endurance and encouragement give you the same attitude of mind toward each other.' },
    { reference: '1 Peter 2:9', text: 'But you are a chosen people, a royal priesthood, a holy nation, God’s special possession.' },
    { reference: 'Proverbs 4:23', text: 'Above all else, guard your heart, for everything you do flows from it.' },
    { reference: 'Matthew 28:20', text: 'And surely I am with you always, to the very end of the age.' },
    { reference: 'John 10:10', text: 'I have come that they may have life, and have it to the full.' },
    { reference: '2 Corinthians 4:17', text: 'For our light and momentary troubles are achieving for us an eternal glory.' },
    { reference: 'Hebrews 12:1', text: 'Let us run with perseverance the race marked out for us.' },
    { reference: 'Psalm 40:1-2', text: 'I waited patiently for the Lord... He lifted me out of the slimy pit.' },
    { reference: 'Titus 2:11-12', text: 'For the grace of God... teaches us to say "No" to ungodliness.' },
    { reference: 'Zephaniah 3:17', text: 'The Lord your God is with you, the Mighty Warrior who saves.' },
    { reference: 'Revelation 21:4', text: 'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain.' }
  ];

  private dailyVerse: BibleVerse | null = null;

  constructor() { }

  getRandomVerse(): BibleVerse {
    if (!this.dailyVerse) {
      const index = Math.floor(Math.random() * this.verses.length);
      this.dailyVerse = this.verses[index];
    }
    return this.dailyVerse;
  }
}
