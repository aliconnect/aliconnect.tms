Algemeen = function(){}
Algemeen.prototype = {
};
3B_basisconcepten_en_hun_notaties = function(){}
3B_basisconcepten_en_hun_notaties.prototype = {
};
Signaleringen = function(){}
Signaleringen.prototype = {
  ResetAlle_Onderdrukt_Variabelen() {
    this.signaleringen.forEach(i=>i.StopOnderdrukken());
  },
  Bevestig() {
    if (
      (this.bevestiging_nodig === "ja")
    ) {
      this.bevestigd = "ja";
    }
  },
  SelecteerCameraEnBevestigDirect() {
    if (
      (this.bevestiging_nodig === "ja") &&
      (this.camera_koppeling === "ja")
    ) {
      this.cctv.SetAlarmCameraMetPreset(this.camera, this.preset);
    }
  },
  Notitie() {
    this.notitie = notitie;
  },
  StartOnderdrukken() {
    this.onderdrukt = "ja";
  },
  StopOnderdrukken() {
    this.onderdrukt = "nee";
  },
  RichtCameraVoor() {
    // TODO: SyntaxError: Unexpected identifier
    // if (
    //   (this.camera_koppeling === "ja") &&
    //   (this.bevestiging_nodig === "ja") &&
    //   (this.conditiewaarde is zojuist veranderd van "nee" naar "ja")
    // ) {
    //   this.camera.RichtPresetVoor(this.preset);
    // }
  },
  BewaakAlarmenMonitorlijst() {
    if (
      (this.conditiewaarde === "ja") &&
      ((this.type === "verkeerskundig_alarm" || this.type === "deelsysteem_alarm")) &&
      (this.in_monitorlijst_alarmen === "nee") &&
      (this.camera_koppeling === "ja")
    ) {
      this.cctv.VoegToeAanMonitorlijst("alarmen", na_einde, this.camera, this.preset);
      this.in_monitorlijst_alarmen = "ja";
    }
    if (
      (this.conditiewaarde === "nee") &&
      (this.in_monitorlijst_alarmen === "ja")
    ) {
      this.cctv.VerwijderCameraEnPresetsUitMonitorlijst("alarmen", this.camera, this.preset);
      this.in_monitorlijst_alarmen = "nee";
    }
  },
  BewaakBevestiging() {
    // TODO: SyntaxError: Unexpected identifier
    // if (
    //   (this.conditiewaarde is zojuist veranderd van "ja" naar "nee")
    // ) {
    //   this.bevestigd = "nee";
    // }
  },
  MeldenAlarm() {
    // TODO: SyntaxError: Unexpected identifier
    // if (
    //   (this.conditiewaarde is zojuist veranderd van "nee" naar "ja") &&
    //   (this.onderdrukt === "nee")
    // ) {
    //   $ukvc6_AlarmNotificatie(this.naam, this.type,;
    //   Actief, this.instantie_id);
    // }
    // if (
    //   (this.conditiewaarde === "ja") &&
    //   ((this.onderdrukt is zojuist veranderd van "ja" naar "nee"))
    // ) {
    //   $ukvc6_AlarmNotificatie(this.naam, this.type,;
    //   Actief, this.instantie_id);
    // }
  },
  AfmeldenAlarm() {
    // TODO: SyntaxError: Unexpected identifier
    // if (
    //   (this.conditiewaarde === "ja") &&
    //   ((this.bevestigd is zojuist veranderd van "nee" naar "ja")) &&
    //   (this.onderdrukt === "nee")
    // ) {
    //   $ukvc6_AlarmNotificatie(this.naam, this.type,;
    //   Inactief, this.instantie_id);
    // }
    // if (
    //   (this.conditiewaarde === "ja") &&
    //   (this.bevestigd === "nee") &&
    //   ((this.onderdrukt is zojuist veranderd van "nee" naar "ja"))
    // ) {
    //   $ukvc6_AlarmNotificatie(this.naam, this.type,;
    //   Inactief, this.instantie_id);
    // }
    // if (
    //   ((this.conditiewaarde is zojuist veranderd van "ja" naar "nee")) &&
    //   (this.bevestigd === "nee") &&
    //   (this.onderdrukt === "nee")
    // ) {
    //   $ukvc6_AlarmNotificatie(this.naam, this.type,;
    //   Inactief, this.instantie_id);
    // }
  },
};
Hoogtedetector = function(){}
Hoogtedetector.prototype = {
  SetDisabled() {
    if (
      (this.hd.bestuurbaar === "ja") &&
      (this.hd.hoogte_overschrijding !== "detector_disabled")
    ) {
      this.hd.SetHoogteOverschrijding("detector_disabled");
      this.enabled = "nee";
    }
    if (
      (this.hd.bestuurbaar === "nee")
    ) {
      this.enabled = "nee";
    }
  },
  SetEnabled() {
    this.enabled = "ja";
  },
  ResetHoogtedetector() {
    if (
      (this.hd.bestuurbaar === "ja")
    ) {
      this.hd.SetHoogteOverschrijding("nee");
    }
  },
  SetInGebruik() {
    this.in_gebruik = in_gebruik;
  },
  HandhaafInstellingen() {
    if (
      (this.hd.bestuurbaar === "ja") &&
      ((this.enabled === "nee" || this.in_gebruik === "nee")) &&
      (this.hd.hoogte_overschrijding !== "detector_disabled")
    ) {
      this.hd.SetHoogteOverschrijding("detector_disabled");
    }
    if (
      (this.hd.bestuurbaar === "ja") &&
      ((this.enabled === "ja") &&
      (this.in_gebruik === "ja" )) &&
      (this.hd.hoogte_overschrijding === "detector_disabled")
    ) {
      this.hd.SetHoogteOverschrijding("nee");
    }
  },
};
Hoogtedetectie = function(){}
Hoogtedetectie.prototype = {
  ResetRoodfase() {
    if (
      (this.rhd.beschikbaarheid !== "niet_beschikbaar") &&
      (this.in_gebruik === "ja")
    ) {
      this.rhd.ResetHoogtedetector();
    }
  },
  ResetWaarschuwingsfase() {
    if (
      (this.whd.beschikbaarheid !== "niet_beschikbaar") &&
      (this.in_gebruik === "ja")
    ) {
      this.whd.ResetHoogtedetector();
    }
  },
  Enable() {
    this.enabled = "ja";
  },
  Disable() {
    this.enabled = "nee";
  },
  SetInGebruik() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.in_gebruik = in_gebruik this.whd.SetInGebruik(in_gebruik);
    // this.rhd.SetInGebruik(in_gebruik);
  },
  BewaakVerkeersbuishoogte() {
    if (
      (this.enabled === "ja") &&
      (this.in_gebruik === "ja") &&
      (this.status === "roodfase")
    ) {
      this.verkeersbuis_afsluiter.Auto_VerkeerslichtenRood();
    }
  },
  KnipperenGeel() {
    if (
      (this.enabled === "ja") &&
      (this.in_gebruik === "ja") &&
      (this.status === "waarschuwingsfase")
    ) {
      this.verkeersbuis_afsluiter.Auto_VerkeerslichtenGeelKnipper();
    }
  },
};
SOS = function(){}
SOS.prototype = {
  EnableSpookrijderDetectie() {
    this.spookrijder_detectie_enabled = "ja";
  },
  DisableSpookrijderDetectie() {
    this.spookrijder_detectie_enabled = "nee";
  },
  EnableEnHandStopOnderdrukkenSosSectie() {
    this.sos.EnableDetector( this.rijstrook, this.start, this.eind, "ja" );
    HandStopOnderdrukkenMeldingen();
  },
  DisableSosSectie() {
    this.sos.EnableDetector( this.rijstrook, this.start, this.eind, "nee" );
  },
  HandStartOnderdrukkenMeldingen() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.meldingen_gewenst="nee" this.Alarm_StilstandGedetecteerd.StartOnderdrukken();
    // this.Alarm_SnelheidsonderschrijdingGedetecteerd.StartOnderdrukken();
    // this.Alarm_SpookrijderGedetecteerd.StartOnderdrukken();
  },
  HandStopOnderdrukkenMeldingen() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.meldingen_gewenst="ja" this.Alarm_StilstandGedetecteerd.StopOnderdrukken();
    // this.Alarm_SnelheidsonderschrijdingGedetecteerd.StopOnderdrukken();
    // this.Alarm_SpookrijderGedetecteerd.StopOnderdrukken();
  },
  SetRichting() {
    if (
      (this.omkeerbaar === "ja")
    ) {
      this.doel_richting = richting;
    }
  },
  AutoStartOnderdrukkenMeldingen() {
    // TODO: SyntaxError: missing ) after argument list
    // this.sos_sectie.forEach(i=>i.meldingen_gewenst="nee" this.sos_sectie[].Alarm_StilstandGedetecteerd.StartOnderdrukken());
    // this.sos_sectie.forEach(i=>i.Alarm_SnelheidsonderschrijdingGedetecteerd.StartOnderdrukken());
    // this.sos_sectie.forEach(i=>i.Alarm_SpookrijderGedetecteerd.StartOnderdrukken());
  },
  AutoStopOnderdrukkenMeldingen() {
    // TODO: SyntaxError: missing ) after argument list
    // this.sos_sectie.forEach(i=>i.meldingen_gewenst="ja" this.sos_sectie[].Alarm_StilstandGedetecteerd.StopOnderdrukken());
    // this.sos_sectie.forEach(i=>i.Alarm_SnelheidsonderschrijdingGedetecteerd.StopOnderdrukken());
    // this.sos_sectie.forEach(i=>i.Alarm_SpookrijderGedetecteerd.StopOnderdrukken());
  },
  HandhaafInstellingen() {
    if (
      (this.sos.bestuurbaar === "ja") &&
      (this.sos.richting !== this.doel_richting)
    ) {
      this.sos.SetRichting(this.doel_richting);
    }
  },
  OnderdrukSnelheidsonderschrijdingAlarmen() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   (this.sos.observeerbaar === "ja") &&
    //   (this.sos.richting === "oplopend") &&
    //   (this.sos_sectie[r, i].meldingen_gewenst === "ja") &&
    //   (this.sos_sectie[r, i].snelheidsonderschrijding === "ja")
    // ) {
    //   j( i - this.aantal_te_onderdrukken_secties ≤ j < i : this.sos_sectie[r, j].
    // this.Alarm_SnelheidsonderschrijdingGedetecteerd.StartOnderdrukken();
    //   );
    // }
    // if (
    //   (this.sos.observeerbaar === "ja") &&
    //   (this.sos.richting= "aflopend") &&
    //   (this.sos_sectie[r, i].meldingen_gewenst === "ja") &&
    //   (this.sos_sectie[r, i].snelheidsonderschrijding === "ja")
    // ) {
    //   j( i<j≤ i + this.aantal_te_onderdrukken_secties : this.sos_sectie[r, j].
    // this.Alarm_SnelheidsonderschrijdingGedetecteerd.StartOnderdrukken();
    //   );
    // }
  },
  StopOnderdrukkenSnelheidsonderschrijdingAlarmen() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   (this.sos.observeerbaar === "ja") &&
    //   (this.sos.richting === "oplopend") &&
    //   (this.sos_sectie[r, i].meldingen_gewenst === "ja") &&
    //   (j( i ≤ j ≤ i + this.aantal_te_onderdrukken_secties  this.sos_sectie[r, j].snelheidsonderschrijding === "nee" ))
    // ) {
    //   this.sos_sectie[r, i].
    // this.Alarm_SnelheidsonderschrijdingGedetecteerd.StopOnderdrukken();
    // }
  },
  OnderdrukStilstandsAlarmen() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   (this.sos.observeerbaar === "ja") &&
    //   (this.sos.richting === "oplopend") &&
    //   (this.sos_sectie[r, i].meldingen_gewenst === "ja") &&
    //   (this.sos_sectie[r, i].stilstand === "ja")
    // ) {
    //   j( i - this.aantal_te_onderdrukken_secties ≤ j < i : this.sos_sectie[r, j].Alarm_StilstandGedetecteerd.StartOnderdrukken();
    //   );
    // }
    // if (
    //   (this.sos.observeerbaar === "ja") &&
    //   (this.sos.richting= "aflopend") &&
    //   (this.sos_sectie[r, i].meldingen_gewenst === "ja") &&
    //   (this.sos_sectie[r, i].stilstand === "ja")
    // ) {
    //   j( i < j ≤ i + this.aantal_te_onderdrukken_secties : this.sos_sectie[r, j].Alarm_StilstandGedetecteerd.StartOnderdrukken();
    //   );
    // }
  },
  StopOnderdrukkenStilstandsAlarmen() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   (this.sos.observeerbaar === "ja") &&
    //   (this.sos.richting === "oplopend") &&
    //   (this.sos_sectie[r, i].meldingen_gewenst === "ja") &&
    //   (j( i ≤ j ≤ i + this.aantal_te_onderdrukken_secties  this.sos_sectie[r, j].stilstand === "nee" ))
    // ) {
    //   this.sos_sectie[r, i].Alarm_StilstandGedetecteerd.StopOnderdrukken();
    // }
    // if (
    //   (this.sos.observeerbaar === "ja") &&
    //   (this.sos.richting= "aflopend") &&
    //   (this.sos_sectie[r, i].meldingen_gewenst === "ja") &&
    //   (j( i - this.aantal_te_onderdrukken_secties ≤ j ≤ i  this.sos_sectie[r, j].stilstand === "nee" ))
    // ) {
    //   this.sos_sectie[r, i].
    // this.Alarm_StilstandGedetecteerd.StopOnderdrukken();
    // }
  },
};
Omroep_Verkeersbuis = function(){}
Omroep_Verkeersbuis.prototype = {
  SetAfTeSpelenBoodschap() {
    // TODO: SyntaxError: Unexpected identifier
    // this.boodschap = opgenomen_boodschap_id;
    // IF periode > 0;
    // THEN this.herhalingsperiode = periode;
    // ELSE this.herhalingsperiode = this.herhalingsperiode[opgenomen_boodschap_id];
    // END_IF;
  },
  AfspelenBoodschapVerkeersbuis() {
    // TODO: SyntaxError: missing ) after argument list
    // this.sectie.forEach(i=>i.stand = "aan" this.gebruiksmode = "boodschap_afspelen" this.boodschap_continueren = "ja" this.boodschap_sectie = ALLE_SECTIES);
  },
  StopAfspelenBoodschapVerkeersbuis() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.gebruiksmode === "boodschap_afspelen")
    // ) {
    //   this.gebruiksmode = "uit" this.boodschap_continueren = "nee";
    // }
  },
  AfspelenBoodschapOmroepSectie() {
    // TODO: SyntaxError: missing ) after argument list
    // this.sectie.forEach(i=>i.stand = "uit" this.sectie[omroepsectie].stand = "aan" this.gebruiksmode = "boodschap_afspelen" this.boodschap_continueren = "ja" this.boodschap_sectie = omroepsectie);
  },
  StopOmroepSectie() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.sectie[omroepsectie].stand = "uit" this.gebruiksmode = "uit" this.boodschap_continueren = "nee";
  },
  ToesprekenVerkeersbuis() {
    // TODO: SyntaxError: missing ) after argument list
    // this.sectie.forEach(i=>i.stand = "aan" this.gebruiksmode = "toespreken");
  },
  ToesprekenOmroepSectie() {
    // TODO: SyntaxError: missing ) after argument list
    // if (
    //   (omroepsectie !== ongeldig)
    // ) {
    //   this.sectie.forEach(i=>i.stand = "uit" this.sectie[omroepsectie].stand = "aan" this.gebruiksmode = "toespreken");
    // }
  },
  StopToesprekenVerkeersbuis() {
    // TODO: SyntaxError: missing ) after argument list
    // if (
    //   (this.gebruiksmode === "toespreken") &&
    //   (this.boodschap_continueren === "nee")
    // ) {
    //   this.gebruiksmode = "uit";
    // }
    // if (
    //   (this.gebruiksmode === "toespreken") &&
    //   (this.boodschap_continueren === "ja") &&
    //   (this.boodschap_sectie === ALLE_SECTIES)
    // ) {
    //   this.sectie.forEach(i=>i.stand = "aan" this.gebruiksmode = "boodschap_afspelen");
    // }
    // if (
    //   (this.gebruiksmode === "toespreken") &&
    //   (this.boodschap_continueren === "ja") &&
    //   (this.boodschap_sectie !== ongeldig) &&
    //   (this.boodschap_sectie !== ALLE_SECTIES)
    // ) {
    //   this.sectie.forEach(i=>i.stand = "uit" this.sectie[this.boodschap_sectie].stand = "aan" this.gebruiksmode = "boodschap_afspelen");
    // }
  },
  StopOmroepVerkeersbuis() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.gebruiksmode = "uit" this.boodschap_continueren = "nee";
  },
  StartAfspelenEnHerhalenBoodschappenVerkeersbuis() {
    if (
      (this.gebruiksmode === "boodschap_afspelen") &&
      (this.omroep.bestuurbaar === "ja") &&
      (this.omroep.opgenomen_boodschap_id === "geen") &&
      (huidige_tijd - this.tijdstip_vorige_keer_afspelen > this.herhalingsperiode) &&
      (this.boodschap !== ongeldig)
    ) {
      this.omroep.StopToespreken();
      this.omroep.SpeelOpgenomenBoodschap(this.boodschap);
      this.tijdstip_vorige_keer_afspelen = huidige_tijd;
    }
  },
  BewaakStoppenAfspelenBoodschapVerkeersbuis() {
    if (
      (this.gebruiksmode === "uit") &&
      (this.omroep.bestuurbaar === "ja") &&
      (this.omroep.opgenomen_boodschap_id !== "geen")
    ) {
      this.omroep.StopOpgenomenBoodschap();
    }
  },
  BewaakToesprekenVerkeersbuis() {
    if (
      (this.gebruiksmode === "toespreken") &&
      (this.omroep.bestuurbaar === "ja") &&
      (this.omroep.toespreken_actief === "nee")
    ) {
      this.omroep.StopOpgenomenBoodschap();
      this.omroep.StartToespreken();
    }
    if (
      (this.gebruiksmode !== ongeldig) &&
      (this.gebruiksmode !== "toespreken") &&
      (this.omroep.bestuurbaar === "ja") &&
      (this.omroep.toespreken_actief === "ja")
    ) {
      this.omroep.StopToespreken();
    }
  },
  HandhaafOmroepSectieStand() {
    if (
      (this.omroepsectie.bestuurbaar === "ja") &&
      (this.omroepsectie.luidspreker_sectie_stand !== this.stand) &&
      (this.stand !== ongeldig)
    ) {
      this.omroepsectie.SetLuidsprekerSectieStand(this.stand);
    }
  },
};
HF_Verkeersbuis = function(){}
HF_Verkeersbuis.prototype = {
  SetAfTeSpelenBoodschap() {
    // TODO: SyntaxError: Unexpected identifier
    // this.boodschap = opgenomen_boodschap_id;
    // IF periode > 0;
    // THEN this.herhalingsperiode = periode;
    // ELSE this.herhalingsperiode = this.herhalingsperiode[opgenomen_boodschap_id];
    // END_IF;
  },
  AfspelenBoodschapVerkeersbuis() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.hf.bestuurbaar === "ja")
    // ) {
    //   this.gebruiksmode = "boodschap_afspelen" this.hf.SetRadioDoorgave("opgenomen_boodschap");
    // }
  },
  StopAfspelenBoodschapVerkeersbuis() {
    if (
      (this.gebruiksmode === "boodschap_afspelen")
    ) {
      this.gebruiksmode = "openbare_radio";
    }
  },
  SpeelBoodschapAfInVerkeersbuis() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.hf.bestuurbaar === "ja")
    // ) {
    //   this.gebruiksmode = "boodschap_afspelen" this.hf.SetRadioDoorgave("opgenomen_boodschap");
    //   this.hf.SpeelOpgenomenBoodschap( boodschap );
    // }
  },
  SpeelRadioInVerkeersbuis() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.hf.bestuurbaar === "ja")
    // ) {
    //   this.gebruiksmode = "openbare_radio" this.hf.SetRadioDoorgave( "openbare_radio" );
    // }
  },
  MuteRadioInVerkeersbuis() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.hf.bestuurbaar === "ja")
    // ) {
    //   this.gebruiksmode = "boodschap_afspelen" this.hf.SetRadioDoorgave("mute");
    // }
  },
  StartAfspelenEnHerhalenHFBoodschappenVerkeersbuis() {
    if (
      (this.gebruiksmode === "boodschap_afspelen") &&
      (huidige_tijd - this.tijdstip_vorige_keer_afspelen > this.herhalingsperiode) &&
      (this.boodschap !== ongeldig)
    ) {
      SpeelBoodschapAfInVerkeersbuis(this.boodschap);
      this.tijdstip_vorige_keer_afspelen = huidige_tijd;
    }
  },
  BewaakStoppenAfspelenHFBoodschapVerkeersbuis() {
    if (
      (this.gebruiksmode === "openbare_radio") &&
      (this.hf.opgenomen_boodschap_id !== "geen")
    ) {
      SpeelRadioInVerkeersbuis();
    }
  },
};
Omroepmonitor_Verkeersbuis = function(){}
Omroepmonitor_Verkeersbuis.prototype = {
  HFMuteOmroepVerkeersbuis() {
    // TODO: SyntaxError: Unexpected token ']'
    // if (
    //   (this.omroep.gebruiksmode === "boodschap_afspelen") &&
    //   (this.sectie[].stand === "aan") &&
    //   (this.omroep.boodschap !== ongeldig)
    // ) {
    //   this.hf.MuteRadioInVerkeersbuis();
    // }
    // if (
    //   (this.omroep.gebruiksmode === "toespreken") &&
    //   (this.sectie[].stand === "aan")
    // ) {
    //   this.hf.MuteRadioInVerkeersbuis();
    // }
    // if (
    //   (( this.omroep.gebruiksmode === "uit" || ( this.sectie[i].stand === "uit") &&
    //   (this.omroep.gebruiksmode !== ongeldig ))) &&
    //   (this.hf.gebruiksmode === "openbare_radio")
    // ) {
    //   this.hf.SpeelRadioInVerkeersbuis();
    // }
  },
};
GeluidsbakenMonitor_Verkeersbuis = function(){}
GeluidsbakenMonitor_Verkeersbuis.prototype = {
  MuteBakenBijOmroep() {
    if (
      (this.geluidsbaken.geluidsbaken_muted === "nee") &&
      (this.sectie[i].geluid_aan === "ja")
    ) {
      this.geluidsbaken.SetGeluidsbakenMuteStand( "ja" );
    }
  },
  UnmuteBakenBijOmroep() {
    // TODO: SyntaxError: Unexpected token ']'
    // if (
    //   (this.geluidsbaken.geluidsbaken_muted === "ja") &&
    //   (this.sectie[].geluid_aan === "nee")
    // ) {
    //   this.geluidsbaken.SetGeluidsbakenMuteStand( "nee" );
    // }
  },
};
VerkeersbuisVerlichting = function(){}
VerkeersbuisVerlichting.prototype = {
  SetOpAutobediening() {
    this.zone.forEach(i=>i.SetZoneOpAutobediening());
  },
  SetOpHandbediening() {
    this.zone.forEach(i=>i.SetZoneOpHandbediening());
  },
  SetHandbedieningsProfiel() {
    // TODO: SyntaxError: Unexpected token ';'
    // this.gesloten_deel_verlichting.;
    // SetHandbedieningsStand(this.gesloten_deel_stand[profiel]);
    // this.niet_gesloten_deel_verlichting.;
    // SetHandbedieningsStand(this.niet_gesloten_deel_stand[profiel]);
    // this.gesloten_deel_verlichting.;
    // SetAutomatischeRegelingHandbedieningsStand("uit");
    // this.niet_gesloten_deel_verlichting.;
    // SetAutomatischeRegelingHandbedieningsStand("uit");
  },
  SetRichting() {
    if (
      (this.omkeerbaar === "ja")
    ) {
      this.ingestelde_richting = richting;
    }
  },
  SetHandbedieningsStand() {
    this.zone.forEach(i=>i.SetZoneHandbedieningsStand(stand));
  },
  SetAutomatischeRegelingHandbedieningsStand() {
    this.zone.forEach(i=>i.SetZoneAutomatischeRegelingHandbedieningsStand(stand));
  },
  SetOpAutobedieningZonderWijzigingen() {
    this.zone.forEach(i=>i.SetZoneOpAutobedieningZonderWijzigingen());
  },
  SetAutobedieningsStand() {
    this.zone.forEach(i=>i.SetZoneAutobedieningsStand(stand));
  },
  SetAutomatischeRegelingAutobedieningsStand() {
    this.zone.forEach(i=>i.SetZoneAutomatischeRegelingAutobedieningsStand(stand));
  },
  SetZoneOpAutobediening() {
    this.zone_bedieningswijze = "auto";
  },
  SetZoneOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.zone_bedieningswijze !== "hand")
    // ) {
    //   this.zone_hand_stand = this.zone_auto_stand this.zone_hand_autoregeling = this.zone_auto_autoregeling this.zone_bedieningswijze = "hand";
    // }
  },
  SetZoneHandbedieningsStand() {
    this.zone_hand_stand = stand;
  },
  SetZoneAutomatischeRegelingHandbedieningsStand() {
    this.zone_hand_autoregeling = stand;
  },
  SetZoneOpAutobedieningZonderWijzigingen() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.zone_bedieningswijze !== "auto")
    // ) {
    //   this.zone_auto_autoregeling = this.zone_hand_autoregeling this.zone_auto_stand = this.zone_hand_stand this.zone_bedieningswijze = "auto";
    // }
  },
  SetZoneAutobedieningsStand() {
    this.zone_auto_stand = stand;
  },
  SetZoneAutomatischeRegelingAutobedieningsStand() {
    this.zone_auto_autoregeling = stand;
  },
  SetMinimaleAutobedieningsStand() {
    this.zone_minimale_auto_stand = stand;
  },
  HandhaafInstellingen() {
    if (
      (this.vbv.bestuurbaar === "ja") &&
      (this.ingestelde_richting !== ongeldig)
    ) {
      this.vbv.SetRichting(this.ingestelde_richting);
    }
  },
  ZoneHandhaafInstellingen() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.zone.bestuurbaar === "ja") &&
    //   (this.functie !== "centraal") &&
    //   (this.functie !== "uitgang") &&
    //   (this.zone_ingestelde_stand === ongeldig) &&
    //   (this.zone_ingestelde_autoregeling !== ongeldig)
    // ) {
    //   this.zone.SetAutoregeling(this.zone_ingestelde_autoregeling );
    // }
    // if (
    //   (this.zone.bestuurbaar === "ja") &&
    //   (this.functie !== "centraal") &&
    //   (this.functie !== "uitgang") &&
    //   (this.zone_bedieningswijze === "hand") &&
    //   (this.zone_hand_autoregeling === "aan")
    // ) {
    //   this.zone.SetAutoregeling(this.zone_hand_autoregeling);
    // }
    // if (
    //   (this.zone.bestuurbaar === "ja") &&
    //   (this.functie !== "centraal") &&
    //   (this.functie !== "uitgang") &&
    //   (this.zone_ingestelde_stand !== ongeldig)
    // ) {
    //   this.zone.SetAutoregeling( "uit" );
    //   this.zone.SetStand( this.zone_ingestelde_stand );
    // }
    // if (
    //   (this.zone_plaatselijk_bediend === "ja")
    // ) {
    //   this.zone_bedieningswijze = "hand" this.zone_hand_autoregeling = this.zone_autoregeling;
    //   IF (this.zone_autoregeling = "aan");
    //   ;
    //   THEN this.zone_hand_stand = ongeldig;
    //   ELSE this.zone_hand_stand = this.zone_huidige_stand;
    //   END_IF;
    // }
  },
};
Verkeerslichten = function(){}
Verkeerslichten.prototype = {
  SetOpAutobediening() {
    if (
      (this.in_gebruik === "ja")
    ) {
      this.bedieningswijze = "auto";
    }
  },
  SetOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.in_gebruik === "ja") &&
    //   (this.bedieningswijze !== "hand")
    // ) {
    //   this.bedieningswijze = "hand" this.hand_stand = this.auto_stand;
    // }
  },
  SetHandStand() {
    if (
      (this.in_gebruik === "ja")
    ) {
      this.hand_stand = stand;
    }
  },
  SetAutoStand() {
    if (
      (this.in_gebruik === "ja")
    ) {
      this.auto_stand = stand;
    }
  },
  SetInGebruik() {
    if (
      (this.ingestelde_stand === "gedoofd")
    ) {
      this.in_gebruik = in_gebruik;
    }
  },
  SetVerkeerslichtActief() {
    this.doel_actief = waarde;
  },
  HandhaafInstellingen() {
    // TODO: SyntaxError: Unexpected string
    // if (
    //   (this.verkeerslicht.bestuurbaar === "ja") &&
    //   (this.doel_actief === "ja") &&
    //   (this."actief" === "nee")
    // ) {
    //   this.verkeerslicht.SetActief( "ja" );
    // }
    // if (
    //   (this.verkeerslicht.bestuurbaar === "ja") &&
    //   (this.doel_actief === "nee") &&
    //   (this."actief" === "ja")
    // ) {
    //   this.verkeerslicht.SetActief( "nee" );
    // }
  },
  BewaakNoodbediening() {
    if (
      (this.in_gebruik === "ja") &&
      (this.verkeerslichten.bestuurbaar === "nee") &&
      (this.verkeerslichten.reden_niet_bestuurbaar[i] === noodbediening)
    ) {
      SetOpHandbediening();
    }
  },
};
MTM_Koppeling = function(){}
MTM_Koppeling.prototype = {
  InstellenSnelheidsBeperking() {
    if (
      (this.mtm.bestuurbaar === "ja") &&
      (this.in_gebruik === "ja")
    ) {
      this.mtm.SetMaatregel( "aan" );
    }
  },
  OpheffenSnelheidsBeperking() {
    if (
      (this.mtm.bestuurbaar === "ja") &&
      (this.in_gebruik === "ja")
    ) {
      this.mtm.SetMaatregel( "uit" );
    }
  },
  SetInGebruik() {
    this.in_gebruik = in_gebruik;
  },
  InstellenKruizenInBuis() {
    if (
      (this.mtm.bestuurbaar === "ja") &&
      (this.in_gebruik === "ja")
    ) {
      this.mtm.SetKruizenInBuis( "aan" );
    }
  },
  OpheffenKruizenInBuis() {
    if (
      (this.mtm.bestuurbaar === "ja") &&
      (this.in_gebruik === "ja")
    ) {
      this.mtm.SetKruizenInBuis( "uit" );
    }
  },
};
Afsluitboom = function(){}
Afsluitboom.prototype = {
  SetOpAutobediening() {
    if (
      (this.in_gebruik === "ja")
    ) {
      this.bedieningswijze = "auto";
    }
  },
  SetOpHandbediening() {
    if (
      (this.in_gebruik === "ja")
    ) {
      this.bedieningswijze = "hand";
    }
  },
  HandOpen() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.asb.bestuurbaar === "ja") &&
    //   (this.bedieningswijze === "hand") &&
    //   (this.in_gebruik === "ja")
    // ) {
    //   this.doel_stand = "op" this.asb.Op();
    // }
  },
  HandVoorwaardelijkSluit() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.asb.bestuurbaar === "ja") &&
    //   (this.bedieningswijze === "hand") &&
    //   (this.obstakelgedetecteerd === ( "nee" | ongeldig )) &&
    //   (this.geblokkeerd === "nee") &&
    //   (this.in_gebruik === "ja")
    // ) {
    //   this.doel_stand = "neer" this.asb.Neer();
    // }
  },
  HandOnvoorwaardelijkSluit() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.asb.bestuurbaar === "ja") &&
    //   (this.bedieningswijze === "hand") &&
    //   (this.in_gebruik === "ja")
    // ) {
    //   this.doel_stand = "neer" this.asb.NeerOnvoorwaardelijk();
    // }
  },
  SetOpHandbedieningEnStop() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.asb.bestuurbaar === "ja") &&
    //   (this.in_gebruik === "ja")
    // ) {
    //   this.bedieningswijze = "hand" this.doel_stand = "stop" this.asb.Stop();
    // }
  },
  AutoVoorwaardelijkSluit() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze === "auto") &&
    //   (this.asb.bestuurbaar === "ja") &&
    //   (this.obstakelgedetecteerd === ( "nee" | ongeldig )) &&
    //   (this.geblokkeerd === "nee") &&
    //   (this.in_gebruik === "ja")
    // ) {
    //   this.doel_stand = "neer" this.asb.Neer();
    // }
    // if (
    //   (this.bedieningswijze === "auto") &&
    //   ((this.asb.bestuurbaar === "nee" || this.obstakelgedetecteerd === "ja"))
    // ) {
    //   this.doel_stand = "neer";
    // }
  },
  AutoOpen() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.asb.bestuurbaar === "ja") &&
    //   (this.bedieningswijze === "auto") &&
    //   (this.in_gebruik === "ja")
    // ) {
    //   this.doel_stand = "op" this.asb.Op();
    // }
  },
  Blokkeer() {
    this.geblokkeerd = waarde;
  },
  AutoStop() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.asb.bestuurbaar === "ja") &&
    //   (this.bedieningswijze === "auto") &&
    //   (this.in_gebruik === "ja")
    // ) {
    //   this.doel_stand = "stop" this.asb.Stop();
    // }
  },
  SetInGebruik() {
    if (
      (this.doel_stand === "op") &&
      (this.transitiestatus_afsluitboom === "bereikt")
    ) {
      this.in_gebruik = in_gebruik;
    }
  },
  BewaakNoodbediening() {
    if (
      (this.in_gebruik === "ja") &&
      (this.asb.bestuurbaar === "nee") &&
      (this.asb.reden_niet_bestuurbaar[i] === noodbediening)
    ) {
      SetOpHandbediening();
    }
  },
};
VerkeersbuisAfsluiter = function(){}
VerkeersbuisAfsluiter.prototype = {
  Hand_VerkeerslichtenGedoofd() {
    if (
      (this.verkeerslichtenbedieningen_vrij === "ja") &&
      (this.in_gebruik === "ja")
    ) {
      VerkeerslichtenOpKritischBeeld();
      this.doel_stand = "gedoofd";
      SetVerkeerslichtenOpAutobediening();
    }
  },
  Hand_VerkeerslichtenRood() {
    if (
      (this.verkeerslichtenbedieningen_vrij === "ja") &&
      (this.in_gebruik === "ja")
    ) {
      this.cctv.SetControleCameraMetPreset( this.verkeerslichten_camera, this.verkeerslichten_camera_preset);
      VerkeerslichtenOpKritischBeeld();
      this.doel_stand = "rood";
      SetVerkeerslichtenOpAutobediening();
    }
  },
  VerkeerslichtenOpKritischBeeld() {
    if (
      (this.in_gebruik === "ja")
    ) {
      this.cctv.SetKritischeCameraMetPreset( this.verkeerslichten_camera, this.verkeerslichten_camera_preset);
    }
  },
  AfsluitbomenOpen() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.in_gebruik === "ja")
    // ) {
    //   IF this.doel_stand = (ongeldig | "afsluitbomen_dicht" | "afsluitbomen_stop");
    //   ;
    //   THEN this.doel_stand = "rood";
    //   END_;
    //   IF;
    //   SetAfsluitbomenOpAutobedieningMetContinuSturing("nee");
    //   this.afsluitboom.forEach(i=>i.AutoOpen());
    // }
  },
  AfsluitbomenVoorwaardelijkSluit() {
    if (
      (this.voldoende_rood_voor_afsluitbomen === "ja") &&
      (this.in_gebruik === "ja")
    ) {
      this.doel_stand = "afsluitbomen_dicht";
      SetAfsluitbomenOpAutobedieningMetContinuSturing("nee");
      this.afsluitboom.forEach(i=>i.AutoVoorwaardelijkSluit());
    }
  },
  AfsluitbomenStop() {
    // TODO: SyntaxError: missing ) after argument list
    // if (
    //   (this.in_gebruik === "ja")
    // ) {
    //   IF ( this.doel_stand = ("afsluitbomen_dicht" | ongeldig);
    //   || this.afsluitboom[i].stand !== "op");
    //   THEN this.doel_stand = "afsluitbomen_stop";
    //   END_;
    //   IF;
    //   SetAfsluitbomenOpAutobedieningMetContinuSturing("nee");
    //   this.afsluitboom.forEach(i=>i.AutoStop());
    // }
  },
  AfsluitbomenOpControlebeeld() {
    if (
      (this.in_gebruik === "ja")
    ) {
      this.cctv.SetControleCameraMetPreset(this.afsluitbomen_camera, this.afsluitbomen_camera_preset);
    }
  },
  Hand_Open() {
    if (
      (this.in_gebruik === "ja" || this.doel_stand === ongeldig)
    ) {
      this.doel_stand = "gedoofd";
      SetAfsluitbomenOpAutobedieningMetContinuSturing("nee");
      this.afsluitboom.forEach(i=>i.AutoOpen());
      SetVerkeerslichtenOpAutobediening();
    }
  },
  Auto_VerkeerslichtenRood() {
    if (
      (this.doel_stand === ("gedoofd" | "geel_knipperen")) &&
      (this.in_gebruik === "ja")
    ) {
      VerkeerslichtenOpKritischBeeld();
      this.doel_stand = "rood";
    }
  },
  Auto_VerkeerslichtenGeelKnipper() {
    if (
      (this.doel_stand === "gedoofd") &&
      (this.in_gebruik === "ja")
    ) {
      this.doel_stand = "geel_knipperen";
    }
  },
  Auto_Dicht() {
    if (
      (this.in_gebruik === "ja")
    ) {
      VerkeerslichtenOpKritischBeeld();
      this.doel_stand = "afsluitbomen_dicht";
      SetVerkeerslichtenOpAutobediening();
      SetAfsluitbomenOpAutobedieningMetContinuSturing("ja");
    }
  },
  SetVerkeerslichtenOpAutobediening() {
    this.verkeerslichten.SetAutoStand(this.verkeerslichten.ingestelde_stand);
    this.verkeerslichten.SetOpAutobediening();
  },
  SetAfsluitbomenOpAutobedieningMetContinuSturing() {
    // TODO: SyntaxError: Unexpected token 'this'
    // IF (continu_sturing = "nee");
    // ;
    // THEN this.max_tijdstip_aansturing_afsluitbomen = 0;
    // ELSE this.max_tijdstip_aansturing_afsluitbomen = huidige_tijd + this.tijd_aansturing_afsluitbomen;
    // END_;
    // IF this.afsluitboom.forEach(i=>i.SetOpAutobediening());
  },
  SetInGebruik() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   ((this.doel_stand === "gedoofd") &&
    //   (this.meest_afgesloten_stand === "gedoofd")
    // || (this.doel_stand === ongeldig) &&
    //   (in_gebruik === "ja"))
    // ) {
    //   this.in_gebruik = in_gebruik this.afsluitboom.forEach(i=>i.SetInGebruik(in_gebruik));
    //   this.mtm.SetInGebruik(in_gebruik);
    //   this.verkeerslichten.SetInGebruik(in_gebruik);
    // }
  },
  Init() {
    if (
      (this.doel_stand === ongeldig) &&
      (this.meest_afgesloten_stand === ("afsluitbomen_dicht" | "rood" | "geel_knipperen" | "gedoofd"))
    ) {
      this.doel_stand = this.meest_afgesloten_stand;
      SetVerkeerslichtenOpAutobediening();
      SetAfsluitbomenOpAutobedieningMetContinuSturing( "nee" );
    }
  },
  SnelheidsbeperkingMtm() {
    if (
      (this.mtm_snelheidsbeperking === "ja") &&
      (this.in_gebruik === "ja")
    ) {
      this.mtm.InstellenSnelheidsBeperking();
    }
    if (
      (this.mtm_snelheidsbeperking === "nee") &&
      (this.in_gebruik === "ja")
    ) {
      this.mtm.OpheffenSnelheidsBeperking();
    }
  },
  HandhaafAfsluitbomenKoppelingVerkeerslichten() {
    if (
      (this.voldoende_rood_voor_afsluitbomen === "ja") &&
      (this.verkeerslichten.stand === "rood") &&
      (this.in_gebruik === "ja")
    ) {
      this.afsluitboom.forEach(i=>i.Blokkeer( "nee" ));
    }
    if (
      (this.voldoende_rood_voor_afsluitbomen !== "ja")
    ) {
      this.afsluitboom.forEach(i=>i.Blokkeer( "ja" ));
    }
  },
  BewaakVerkeerslichten() {
    // TODO: SyntaxError: Unexpected token ']'
    // if (
    //   (this.doel_stand === "gedoofd") &&
    //   (this.afsluitboom[].stand === "op") &&
    //   (this.in_gebruik === "ja")
    // ) {
    //   this.verkeerslichten.SetAutoStand( "gedoofd" );
    // }
    // if (
    //   (this.doel_stand === "geel_knipperen") &&
    //   (this.afsluitboom[].stand === "op") &&
    //   (this.in_gebruik === "ja")
    // ) {
    //   this.verkeerslichten.SetAutoStand( "geel_knipperen" );
    // }
    // if (
    //   ((this.doel_stand === ("afsluitbomen_dicht" | "afsluitbomen_stop" | "rood")
    // || this.afsluitboom[i].stand !== "op" )) &&
    //   (this.in_gebruik === "ja")
    // ) {
    //   this.verkeerslichten.SetAutoStand( "rood" );
    // }
  },
  BewaakAfsluitbomen() {
    if (
      (this.doel_stand === "afsluitbomen_dicht") &&
      (this.voldoende_rood_voor_afsluitbomen === "ja") &&
      (huidige_tijd < this.max_tijdstip_aansturing_afsluitbomen) &&
      (this.in_gebruik === "ja")
    ) {
      this.afsluitboom.forEach(i=>i.AutoVoorwaardelijkSluit());
    }
    if (
      (this.doel_stand === "afsluitbomen_stop") &&
      (this.in_gebruik === "ja")
    ) {
      this.afsluitboom.forEach(i=>i.AutoStop());
    }
  },
  BepaalTijdstipRoodBereikt() {
    // TODO: SyntaxError: Unexpected token ']'
    // if (
    //   (this.rijstrook[]."rood" === "ja") &&
    //   (this.tijdstip_rood_bereikt === ongeldig)
    // ) {
    //   this.tijdstip_rood_bereikt = huidige_tijd;
    // }
    // if (
    //   (this.rijstrook[i]."rood" !== "ja") &&
    //   (this.tijdstip_rood_bereikt !== ongeldig)
    // ) {
    //   this.tijdstip_rood_bereikt = ongeldig;
    // }
  },
  HandhaafOnderdrukkenVerkeerslichtDoorMTM() {
    if (
      (this.mtm.is_afgekruist_verkeerslicht[this.id] === "ja")
    ) {
      this.verkeerslicht.SetVerkeerslichtActief( "nee" );
    }
    if (
      (this.mtm.is_afgekruist_verkeerslicht[this.id] === ( ongeldig | "nee" ))
    ) {
      this.verkeerslicht.SetVerkeerslichtActief( "ja" );
    }
  },
};
Hulppost = function(){}
Hulppost.prototype = {
  EnableHulppostDeur() {
    this.hpk.EnableDetector( deur, "ja" );
  },
  DisableHulppostDeur() {
    this.hpk.EnableDetector( deur, "nee" );
  },
  EnableSlanghaspelStandDetectie() {
    this.hpk.EnableDetector( spuitmond, "ja" );
  },
  DisableSlanghaspelStandDetectie() {
    this.hpk.EnableDetector( spuitmond, "nee" );
  },
  EnableBlusapparaatDetectie() {
    this.hpk.EnableDetector( blusapparaat, "ja" );
  },
  DisableBlusapparaatDetectie() {
    this.hpk.EnableDetector( blusapparaat, "nee" );
  },
};
CCTV = function(){}
CCTV.prototype = {
  SetRichtingCameras() {
    if (
      (richting === "mee")
    ) {
      this.camera.forEach(i=>i.SetRichting(this.rijrichting));
    }
    if (
      (richting === "tegen")
    ) {
      this.camera.forEach(i=>i.SetRichting(tegenovergestelde(this.rijrichting)));
    }
  },
  StartSchouwen() {
    if (
      (((richting_tov_verkeer === "mee")) &&
      ((this.rijrichting === "oplopend")) || ((richting_tov_verkeer === "tegen")) &&
      ((this.rijrichting === "aflopend")))
    ) {
      StartSchouwenVanaf( 1 , richting_tov_verkeer);
    }
    StartSchouwenVanaf(lengte(this.schouwlijst), richting_tov_verkeer);
  },
  StartSchouwenVanaf() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   ((this.cctv.bestuurbaar === "ja")) &&
    //   ((start >= 1)) &&
    //   ((start ≤ lengte(this.schouwlijst)))
    // ) {
    //   this.schouwrichting_tov_verkeer = richting_tov_verkeer;
    //   IF this.schouwrichting = "oplopend";
    //   THEN this.schouwcamera_index = start;
    //   ELSE this.schouwcamera_index = start - lengte(this.schouwkanalen);
    //   + 1;
    //   END_;
    //   IF;
    //   ToonEnPrefetchSchouwkanalen();
    // }
  },
  StopSchouwen() {
    if (
      (this.cctv.bestuurbaar === "ja")
    ) {
      this.schouwkanalen.forEach(i=>i.SetStatus("verbergen"));
      this.schouwkanalen_prefetch.forEach(i=>i.SetStatus("verbergen"));
      SetActieveKanaal(this.laatste_actieve_kanaal, "ja");
    }
  },
  SchouwOplopend() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   (this.schouwcamera_index ≤ (lengte(this.schouwlijst)
    // - lengte(this.schouwkanalen)))
    // ) {
    //   this.schouwcamera_index = this.schouwcamera_index + lengte(this.schouwkanalen);
    //   ToonEnPrefetchSchouwkanalen();
    // }
  },
  SchouwAflopend() {
    if (
      (this.schouwcamera_index > 1)
    ) {
      this.schouwcamera_index = this.schouwcamera_index - lengte(this.schouwkanalen);
      ToonEnPrefetchSchouwkanalen();
    }
  },
  StartMonitoren() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.cctv.bestuurbaar === "ja") &&
    //   (this.monitoren_aan === "nee")
    // ) {
    //   this.huidige_monitorlijst_index = lijst this.monitorcamera_index = 1;
    //   SetAlarmCameraMetPreset(this.huidige_monitorlijst[this.monitorcamera_index].camera, this.huidige_monitorlijst[this.monitorcamera_index].preset);
    //   this.monitoren_aan = "ja";
    // }
  },
  StopMonitoren() {
    if (
      (this.cctv.bestuurbaar === "ja") &&
      (this.monitoren_aan === "ja")
    ) {
      this.monitoren_aan = "nee";
      SetAlarmCameraMetPreset("geen", leeg);
    }
  },
  VoegFavorietToe() {
    VoegToeAanMonitorlijst(lijst, pos, camera, preset);
  },
  VerwijderFavoriet() {
    VerwijderPositieUitMonitorlijst(lijst, pos);
  },
  StartHistorischeBeeldenBron() {
    // TODO: SyntaxError: Unexpected token ';'
    // this.historische_beeldenbron.SelecteerOpgenomenCamera(camera, tijd);
    // this.historische_beeldenbron.default_kanaal.;
    // SelecteerHistorischBeeld(this.historische_beeldenbron);
  },
  SelecteerCamera() {
    if (
      (camera !== this.camera)
    ) {
      OntkoppelCamera(camera="geen");
      OntkoppelHistorischBeeld();
      KoppelCamera(camera, "ja");
    }
  },
  SelecteerCameraMetPreset() {
    camera.SetPresetVoorwaardelijk(preset);
    SelecteerCamera(camera);
  },
  SelecteerHistorischBeeld() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (historische_beeldenbron.historische_beeldenbron.bestuurbaar === "ja")
    // ) {
    //   OntkoppelHistorischBeeld();
    //   OntkoppelCamera("nee");
    //   historische_beeldenbron.historische_beeldenbron.;
    //   SelectHistorischBeeld(this.kanaal_id);
    //   this.historische_beeldenbron = historische_beeldenbron $ukvc8_vraagVideoConnectie(this.kanaal_id, "geen", this.historische_beeldenbron.historische_beeldenbron.video_interface, this.kanaaltype, historisch);
    // }
  },
  StopOpgenomenBeelden() {
    if (
      (this.historische_beeldenbron !== "geen")
    ) {
      SelecteerCamera(this.laatste_gekoppelde_camera);
    }
  },
  SetPresetOnvoorwaardelijk() {
    if (
      (this.camera.bestuurbaar === "ja")
    ) {
      this.camera.SetToPreset(preset);
      this.huidige_preset = preset;
    }
  },
  StelPresetIn() {
    if (
      (this.camera.bestuurbaar === "ja")
    ) {
      this.camera.DefinieerPreset(preset, pan, tilt, zoom, focus, diafragma);
    }
  },
  SetGeblokkeerd() {
    this.geblokkeerd = waarde;
  },
  StartPermanenteOpslag() {
    if (
      (this.opslag.bestuurbaar === "ja")
    ) {
      this.opslag.StartPermanenteOpslag(huidige_tijd - this.periode_voor_incident);
    }
  },
  StopPermanenteOpslag() {
    if (
      (this.opslag.bestuurbaar === "ja")
    ) {
      this.opslag.StopPermanenteOpslag(huidige_tijd);
    }
  },
  WisOpslagSessie() {
    if (
      (this.opslag.bestuurbaar === "ja") &&
      (this.permanente_opslag_sessie[i].id === id)
    ) {
      this.opslag.WisPermanenteOpslagSessie(id);
    }
  },
  KopieerNaarCotsMedium() {
    if (
      (this.opslag.bestuurbaar === "ja") &&
      (this.cots_bestemming !== leeg)
    ) {
      this.opslag.KopieerPermanenteOpslagBeeld(sessie_index, this.cots_bestemming);
    }
  },
  SetSessieOmschrijving() {
    if (
      (this.opslag.bestuurbaar === "ja") &&
      (this.permanente_opslag_sessie[i].id === id)
    ) {
      this.opslag.SetSessieOmschrijving(id, tekst);
    }
  },
  SelecteerOpgenomenCamera() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.historische_beeldenbron.bestuurbaar === "ja")
    // ) {
    //   this.historische_beeldenbron.;
    //   UnselectCameraOpgeslagenBeeld(this.opgenomen_camera_id);
    //   this.historische_beeldenbron.;
    //   SelectCameraOpgeslagenBeeld(this.opgenomen_camera_id, tijd);
    // }
  },
  OntkoppelOpgenomenCamera() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.historische_beeldenbron.bestuurbaar === "ja")
    // ) {
    //   this.historische_beeldenbron.;
    //   UnselectCameraOpgeslagenBeeld(this.opgenomen_camera_id);
    // }
  },
  Pauze() {
    if (
      (this.historische_beeldenbron.bestuurbaar === "ja")
    ) {
      this.historische_beeldenbron.Pauze(this.opgenomen_camera_id);
    }
  },
  Play() {
    if (
      (this.historische_beeldenbron.bestuurbaar === "ja")
    ) {
      this.historische_beeldenbron.Play(this.opgenomen_camera_id);
    }
  },
  FastForward() {
    if (
      (this.historische_beeldenbron.bestuurbaar === "ja") &&
      (snelheid > 0)
    ) {
      this.historische_beeldenbron.FastForward(this.opgenomen_camera_id, snelheid);
    }
  },
  FastReverse() {
    if (
      (this.historische_beeldenbron.bestuurbaar === "ja") &&
      (snelheid > 0)
    ) {
      this.historische_beeldenbron.FastBackward(this.opgenomen_camera_id, snelheid);
    }
  },
  Jump() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.historische_beeldenbron.bestuurbaar === "ja")
    // ) {
    //   this.historische_beeldenbron.;
    //   SelectCameraOpgeslagenBeeld(this.opgenomen_camera_id, tijd);
    // }
  },
  SetActieveKanaal(kanaal() {
    // TODO: SyntaxError: Unexpected identifier
    // IF kanaal = "geen" || kanaal.status !== "tonen" || kanaal.camera = "geen";
    // THEN this.actieve_kanaal = "geen";
    // ELSE this.actieve_kanaal = kanaal;
    // IF (aanvragen = "ja");
    // ;
    // THEN $ukvc8_verzoekActieveViewer(kanaal);
    // END_;
    // IF;
    // END_IF;
  },
  SetControleCamera(camera() {
    this.controlekanaal.SelecteerCamera(camera);
    this.controlekanaal.SetStatus("tonen");
    SetActieveKanaal(this.controlekanaal, "ja");
  },
  SetControleCameraMetPreset(camera() {
    this.controlekanaal.SelecteerCameraMetPreset(camera, preset);
    this.controlekanaal.SetStatus("tonen");
    SetActieveKanaal(this.controlekanaal, "ja");
  },
  SetAlarmCameraMetPreset(camera() {
    // TODO: SyntaxError: Unexpected identifier
    // IF camera = "geen";
    // THEN this.alarmkanalen.forEach(i=>i.SetStatus("verbergen"));
    // SetActieveKanaal(this.laatste_actieve_kanaal, "ja");
    // ELSE camera.camera_voor.SetRichting(this.rijrichting);
    // camera.camera_voorbij.SetRichting(this.rijrichting);
    // this.alarmkanalen[VOOR].SelecteerCamera(camera.camera_voor);
    // this.alarmkanalen[OP].SelecteerCameraMetPreset(camera, preset);
    // this.alarmkanalen[VOORBIJ].SelecteerCamera(camera.camera_voorbij);
    // this.alarmkanalen.forEach(i=>i.SetStatus("tonen"));
    // SetActieveKanaal(this.alarmkanalen[OP], "ja");
    // END_IF;
  },
  SetKritischeCameraMetPreset(camera() {
    if (
      (camera !== "geen")
    ) {
      this.kritische_kanalen[camera.index_kritisch_kanaal].SelecteerCameraMetPreset(camera, preset);
    }
  },
  VoegToeAanMonitorlijst() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   (pos ≤ lengte(this.monitorlijsten[lijst])
    // || pos === na_einde)
    // ) {
    //   voeg_in(this.monitorlijsten[lijst], pos, { camera = camera, preset = preset });
    //   ;
    //   IF (this.huidige_monitorlijst_index = lijst);
    //   &&
    //   (pos !== na_einde);
    //   &&
    //   (this.monitorcamera_index >= pos);
    //   THEN this.monitorcamera_index = this.monitorcamera_index + 1;
    //   END_IF;
    // }
  },
  VerwijderPositieUitMonitorlijst() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   (pos ≤ lengte(this.monitorlijsten[lijst]))
    // ) {
    //   verwijder(this.monitorlijsten[lijst], pos);
    //   ;
    //   IF (this.huidige_monitorlijst_index = lijst);
    //   &&
    //   (this.monitorcamera_index >= pos);
    //   &&
    //   (this.monitorcamera_index > 1);
    //   THEN this.monitorcamera_index = this.monitorcamera_index - 1;
    //   END_IF;
    // }
  },
  VerwijderCameraEnPresetsUitMonitorlijst() {
    if (
      (this.monitorlijsten[lijst][i].camera === camera) &&
      (this.monitorlijsten[lijst][i].preset === preset)
    ) {
      VerwijderPositieUitMonitorlijst(lijst, i);
    }
  },
  RichtVolgendeMonitorCameraVoor() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.monitorcamera_index > 0) &&
    //   (this.monitorcamera_index < lengte(this.huidige_monitorlijst))
    // ) {
    //   this.huidige_monitorlijst[this.monitorcamera_index + 1].camera.;
    //   RichtBurenVoor(this.rijrichting);
    //   this.huidige_monitorlijst[this.monitorcamera_index + 1].camera.;
    //   RichtPresetVoor(this.huidige_monitorlijst[this.monitorcamera_index + 1].preset);
    // }
  },
  SetRijrichting() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.rijrichting = richting this.camera.forEach(i=>i.SetReferentiePreset(richting));
    // this.camera.forEach(i=>i.SetRichting(richting));
  },
  CalamiteitBeeldenSetAan() {
    this.calamiteit_preset_kanalen.forEach(i=>i.SetStatus("tonen"));
  },
  CalamiteitBeeldenSetUit() {
    this.calamiteit_preset_kanalen.forEach(i=>i.SetStatus("verbergen"));
  },
  ToonEnPrefetchSchouwkanalen() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   (this.cctv.bestuurbaar === "ja")
    // ) {
    //   ∀i (this.schouwkanalen[i] !== "geen":;
    //   SelecteerSchouwCamera(this.schouwkanalen[i], (i - 1 + this.schouwcamera_index)));
    //   ∀i (this.schouwkanalen_prefetch[i] !== "geen":;
    //   SelecteerSchouwCamera(this.schouwkanalen_prefetch[i], (i - 1 + this.schouwcamera_index_prefetch)));
    //   this.schouwkanalen.forEach(i=>i.SetStatus("tonen"));
    //   this.schouwkanalen_prefetch.forEach(i=>i.SetStatus("voorbereiden"));
    //   SetActieveKanaal("geen", "ja");
    // }
  },
  SelecteerSchouwCamera(schouwkanaal() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   ((camera_index >= 1)) &&
    //   ((camera_index ≤ lengte(this.schouwlijst)))
    // ) {
    //   schouwkanaal.SelecteerCameraMetPreset(this.schouwlijst[camera_index].camera, this.schouwlijst[camera_index].preset);
    // }
    // schouwkanaal.SelecteerCamera("geen");
  },
  SetStatus() {
    if (
      (status !== this.status)
    ) {
      this.status = status;
      SetCameraGetoond(this.status, "ja");
    }
  },
  KoppelCamera() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (camera !== "geen")
    // ) {
    //   this.camera = camera;
    //   SetCameraGetoond(this.status, aanvragen);
    //   ;
    //   IF (this.camera.camera.bestuurbaar = "ja");
    //   THEN this.camera.camera.SelectCameraActueelBeeld(this.kanaal_id);
    //   END_IF;
    // }
  },
  OntkoppelCamera() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.camera !== "geen")
    // ) {
    //   IF (this.camera.camera.bestuurbaar = "ja");
    //   ;
    //   THEN this.camera.camera.UnselectCameraActueelBeeld(this.kanaal_id);
    //   END_;
    //   IF;
    //   SetCameraGetoond("verbergen", aanvragen);
    //   this.camera = "geen";
    // }
  },
  OntkoppelHistorischBeeld() {
    if (
      (this.historische_beeldenbron.historische_beeldenbron.bestuurbaar === "ja")
    ) {
      this.historische_beeldenbron.OntkoppelKanaal(this.kanaal_id);
      this.historische_beeldenbron = "geen";
    }
  },
  SetCameraGetoond() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.camera !== "geen")
    // ) {
    //   IF (status = "tonen");
    //   ;
    //   THEN this.camera.SetGetoondOpKanaal(this.kanaal_id, "ja");
    //   ELSE this.camera.SetGetoondOpKanaal(this.kanaal_id, "nee");
    //   END_;
    //   IF;
    //   IF (aanvragen = "ja");
    //   &&
    //   (status = ("tonen" | "voorbereiden"));
    //   THEN $ukvc8_vraagVideoConnectie( this.kanaal_id, this.camera.camera.ptz_interface, this.camera.camera.video_interface, this.kanaaltype, camera);
    //   ;
    //   ELSIF (aanvragen = "ja");
    //   &&
    //   (status = "verbergen");
    //   THEN $ukvc8_vraagVideoConnectie( this.kanaal_id, "geen", "geen", this.kanaaltype, camera);
    //   END_IF;
    // }
  },
  Draai() {
    if (
      (this.camera.bestuurbaar === "ja")
    ) {
      this.camera.SetPan(graden);
      this.huidige_preset = leeg;
    }
  },
  Neig() {
    if (
      (this.camera.bestuurbaar === "ja")
    ) {
      this.camera.SetTilt(graden);
      this.huidige_preset = leeg;
    }
  },
  Zoom() {
    if (
      (this.camera.bestuurbaar === "ja")
    ) {
      this.camera.SetZoom(zoom);
      this.huidige_preset = leeg;
    }
  },
  Focus() {
    if (
      (this.camera.bestuurbaar === "ja")
    ) {
      this.camera.SetFocus(focus);
      this.huidige_preset = leeg;
    }
  },
  TegenlichtCompensatie() {
    if (
      (this.camera.bestuurbaar === "ja")
    ) {
      this.camera.SetDiafragma(diafragma);
      this.huidige_preset = leeg;
    }
  },
  RichtPresetVoor() {
    if (
      (this.getoond === "nee")
    ) {
      SetPresetVoorwaardelijk(preset);
    }
  },
  RichtBurenVoor() {
    this.camera_voor.RichtPresetVoor(this.camera_voor.preset[richting]);
    this.camera_voorbij.RichtPresetVoor(this.camera_voorbij.preset[richting]);
  },
  SetRichting() {
    SetPresetVoorwaardelijk(this.preset[richting]);
  },
  SetReferentiePreset() {
    if (
      (this.camera.bestuurbaar === "ja")
    ) {
      this.camera.SetReferentiePreset(this.preset[richting]);
    }
  },
  SetPresetVoorwaardelijk() {
    if (
      (this.geblokkeerd === "nee")
    ) {
      SetPresetOnvoorwaardelijk(preset);
    }
  },
  SetGetoondOpKanaal() {
    // TODO: SyntaxError: Unexpected token ']'
    // if (
    //   ((getoond === "ja")) &&
    //   ((this.kanalen_waarvoor_getoond[] !== kanaal_id))
    // ) {
    //   voeg_in(this.kanalen_waarvoor_getoond, na_einde, kanaal_id);
    // }
    // if (
    //   ((getoond === "nee")) &&
    //   ((this.kanalen_waarvoor_getoond[i] === kanaal_id))
    // ) {
    //   verwijder(this.kanalen_waarvoor_getoond, i);
    // }
  },
  OntkoppelKanaal() {
    if (
      (this.historische_beeldenbron.bestuurbaar === "ja")
    ) {
      this.historische_beeldenbron.UnselectHistorischBeeld(kanaal_id);
    }
  },
  VolgActiefKanaal() {
    if (
      (this.actieve_kanaal !== "geen")
    ) {
      this.laatste_actieve_kanaal = this.actieve_kanaal;
    }
  },
  VolgAlarmKanaal() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.alarmkanalen[OP].camera !== "geen") &&
    //   (this.alarmkanalen[VOOR] !== this.actieve_kanaal) &&
    //   (this.alarmkanalen[VOORBIJ] !== this.actieve_kanaal)
    // ) {
    //   IF this.alarmkanalen[OP].camera = this.alarmkanalen[VOORBIJ].camera;
    //   THEN this.alarmkanalen[OP].camera.camera_voorbij.SetRichting(this.rijrichting);
    //   ;
    //   ELSIF this.alarmkanalen[OP].camera = this.alarmkanalen[VOOR].camera;
    //   THEN this.alarmkanalen[OP].camera.camera_voor.SetRichting(this.rijrichting);
    //   END_;
    //   IF this.alarmkanalen[VOOR].;
    //   SelecteerCamera(this.alarmkanalen[OP].camera.camera_voor);
    //   this.alarmkanalen[VOORBIJ].;
    //   SelecteerCamera(this.alarmkanalen[OP].camera.camera_voorbij);
    // }
    // if (
    //   (this.alarmkanalen[OP].camera !== "geen") &&
    //   (this.alarmkanalen[VOOR] === this.actieve_kanaal)
    // ) {
    //   IF this.alarmkanalen[OP].camera = this.alarmkanalen[VOOR].camera;
    //   THEN this.alarmkanalen[VOOR].camera.camera_voorbij.camera_voorbij.;
    //   SetRichting(this.rijrichting);
    //   ;
    //   ELSIF this.alarmkanalen[OP].camera = this.alarmkanalen[VOOR].camera.camera_voorbij.camera_voorbij;
    //   THEN this.alarmkanalen[VOOR].camera.SetRichting(this.rijrichting);
    //   END_;
    //   IF this.alarmkanalen[OP].;
    //   SelecteerCamera(this.alarmkanalen[VOOR].camera.camera_voorbij);
    //   this.alarmkanalen[VOORBIJ].;
    //   SelecteerCamera(this.alarmkanalen[OP].camera.camera_voorbij);
    // }
    // if (
    //   ()
    // ) {
    //   ;
    // }
  },
  PrepareerPresetAlarmKanalen() {
    // TODO: SyntaxError: Unexpected identifier
    // this.alarmkanalen[VOOR].camera.camera_voor.RichtPresetVoor( this.alarmkanalen[VOOR].camera.camera_voor.preset[this.rijrichting]);
    // this.alarmkanalen[VOORBIJ].camera.camera_voorbij.RichtPresetVoor( this.alarmkanalen[VOORBIJ].camera.camera_voorbij.preset[this.rijrichtin g]);
  },
  CCTVMonitoren() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.cctv.bestuurbaar === "ja") &&
    //   (this.monitoren_aan === "ja") &&
    //   (this.monitorcamera_index >= 0) &&
    //   (this.monitorcamera_index < lengte(this.huidige_monitorlijst)) &&
    //   (huidige_tijd - this.tijdstip_laatste_monitoractie > this.monitortijd)
    // ) {
    //   this.monitorcamera_index = this.monitorcamera_index + 1 this.alarmkanalen[OP].SelecteerCameraMetPreset( this.huidige_monitorlijst[this.monitorcamera_index].camera, this.huidige_monitorlijst[this.monitorcamera_index].preset);
    //   RichtVolgendeMonitorCameraVoor();
    //   this.tijdstip_laatste_monitoractie = huidige_tijd;
    // }
    // if (
    //   (this.cctv.bestuurbaar === "ja") &&
    //   (this.monitoren_aan === "ja") &&
    //   ((this.monitorcamera_index < 0 || this.monitorcamera_index >= lengte(this.huidige_monitorlijst))) &&
    //   (huidige_tijd - this.tijdstip_laatste_monitoractie > this.monitortijd)
    // ) {
    //   StopMonitoren();
    // }
  },
  Init() {
    // TODO: SyntaxError: Invalid left-hand side in assignment
    // if (
    //   (this.init !== "klaar")
    // ) {
    //   IF (this.camera !== "geen" &&
    //   this.status = "tonen");
    //   THEN this.camera.SetGetoondOpKanaal(this.kanaal_id, "ja");
    //   END_;
    //   IF this.init = "klaar";
    // }
  },
  VolgGekoppeldeCamera() {
    if (
      (this.camera !== "geen")
    ) {
      this.laatste_gekoppelde_camera = this.camera;
    }
  },
};
Omroep_CCTV_Afstemming = function(){}
Omroep_CCTV_Afstemming.prototype = {
};
Noodtelefoon_Verkeersbuis = function(){}
Noodtelefoon_Verkeersbuis.prototype = {
  Enable() {
    this.toestel.SetEnabled("ja");
  },
  Disable() {
    this.toestel.SetEnabled("nee");
  },
};
Verkeersbuis_Langsventilatie = function(){}
Verkeersbuis_Langsventilatie.prototype = {
  SetOpAutobediening() {
    this.bedieningswijze = "auto";
  },
  SetOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze === "auto")
    // ) {
    //   this.hand_stand = this.auto_stand this.hand_richting = this.auto_richting this.bedieningswijze = "hand";
    // }
  },
  SetHandbedieningsStand() {
    this.hand_stand = stand;
  },
  SetHandbedieningsRichting() {
    this.hand_richting = richting;
  },
  SetClusterOpHandbediening() {
    // TODO: SyntaxError: Unexpected identifier
    // _ cluster_ventilator.forEach(i=>i.SetVentilatorOpHandbediening());
  },
  SetClusterOpAutobediening() {
    // TODO: SyntaxError: Unexpected identifier
    // _ cluster_ventilator.forEach(i=>i.SetVentilatorOpAutobediening());
  },
  SetClusterHandbedieningsStand() {
    this.cluster_ventilator.forEach(i=>i.SetVentilatorHandbedieningsStand( stand ));
  },
  ClusterEnable() {
    this.cluster_ventilator.forEach(i=>i.VentilatorEnable());
  },
  ClusterDisable() {
    this.cluster_ventilator.forEach(i=>i.VentilatorDisable());
  },
  SetVentilatorOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.ventilator_bedieningswijze !== "hand")
    // ) {
    //   this.ventilator_hand_stand = this.ventilator.stand this.ventilator_bedieningswijze = "hand";
    // }
  },
  SetVentilatorOpAutobediening() {
    this.ventilator_bedieningswijze = "auto";
  },
  SetVentilatorHandbedieningsStand() {
    this.ventilator_hand_stand = stand;
  },
  VentilatorEnable() {
    this.ventilator.SetEnabled( "ja" );
  },
  VentilatorDisable() {
    this.ventilator.SetEnabled( "nee" );
  },
  SetAutobedieningsStand() {
    this.auto_stand = stand;
  },
  SetSensorregelingStand() {
    this.sensorregeling_stand = stand;
  },
  SetAutobedieningsRichting() {
    this.auto_richting = richting;
  },
  SetGeheelOpAutobediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.bedieningswijze = "auto" this.cluster.forEach(i=>i.SetClusterOpAutobediening());
  },
  SetTemperatuurBeveiliging() {
    if (
      (this.ventilatie.bestuurbaar === "ja")
    ) {
      this.ventilatie.SetTemperatuurBeveiliging(stand);
    }
  },
  SetOnbalansBeveiliging() {
    if (
      (this.ventilatie.bestuurbaar === "ja")
    ) {
      this.ventilatie.SetOnbalansBeveiliging(stand);
    }
  },
  HandhaafInstellingen() {
    if (
      (this.ventilatie.bestuurbaar === "ja") &&
      (this.bedieningswijze === "auto") &&
      (this.auto_stand !== "sensorregeling") &&
      (this.auto_richting !== ongeldig) &&
      (this.auto_stand !== ongeldig)
    ) {
      this.ventilatie.SetRichting(this.auto_richting);
      this.ventilatie.SetStand(this.auto_stand);
    }
    if (
      (this.ventilatie.bestuurbaar === "ja") &&
      (this.bedieningswijze === "hand") &&
      (this.hand_stand === "sensorregeling") &&
      (this.hand_richting !== ongeldig) &&
      (this.sensorregeling_stand !== ongeldig)
    ) {
      this.ventilatie.SetRichting(this.hand_richting);
      this.ventilatie.SetStand(this.sensorregeling_stand);
    }
    if (
      (this.ventilatie.bestuurbaar === "ja") &&
      (this.bedieningswijze === "auto") &&
      (this.auto_stand === "sensorregeling") &&
      (this.auto_richting !== ongeldig) &&
      (this.sensorregeling_stand !== ongeldig)
    ) {
      this.ventilatie.SetRichting(this.auto_richting);
      this.ventilatie.SetStand(this.sensorregeling_stand);
    }
    if (
      (this.ventilatie.bestuurbaar === "ja") &&
      (this.bedieningswijze === "hand") &&
      (this.hand_stand !== "sensorregeling") &&
      (this.hand_richting !== ongeldig) &&
      (this.hand_stand !== ongeldig)
    ) {
      this.ventilatie.SetRichting(this.hand_richting);
      this.ventilatie.SetStand(this.hand_stand);
    }
  },
  HandhaafVentilatorInstellingen() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.ventilator.bestuurbaar === "ja") &&
    //   (this.ventilator_bedieningswijze === "auto")
    // ) {
    //   this.ventilator.SetBesturing(collectief);
    // }
    // if (
    //   (this.ventilator.bestuurbaar === "ja") &&
    //   (this.ventilator_bedieningswijze === "hand") &&
    //   (this.ventilator_hand_stand !== ongeldig)
    // ) {
    //   this.ventilator.SetBesturing(individueel);
    //   this.ventilator.SetStand(this.ventilator_hand_stand);
    // }
    // if (
    //   (this.ventilator.observeerbaar === "ja") &&
    //   (this.ventilator_plaatselijk_bediend === "ja") &&
    //   ((this.ventilator_hand_stand !== this.ventilator.stand || this.ventilator_bedieningswijze !== "hand"))
    // ) {
    //   this.ventilator_bedieningswijze = "hand" this.ventilator_hand_stand = this.ventilator.stand;
    // }
  },
};
Luchtkwaliteitsmeting_Verkeersbuis = function(){}
Luchtkwaliteitsmeting_Verkeersbuis.prototype = {
  EnableZichtmeter() {
    this.lkm.EnableDetector( zichtmeter, "ja" );
  },
  DisableZichtmeter() {
    this.lkm.EnableDetector( zichtmeter, "nee" );
  },
  BewaakRookdetecties() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   (this.lkm.observeerbaar === "ja") &&
    //   (( this.zichtmeting[i] > this.grenswaarde_rook )) &&
    //   (this.rook_detecties[i] !== "ja")
    // ) {
    //   this.rook_detecties[i] = "ja";
    // }
    // if (
    //   (this.lkm.observeerbaar === "ja") &&
    //   (( this.zichtmeting[i] ≤ this.grenswaarde_rook )) &&
    //   (this.rook_detecties[i] !== "nee")
    // ) {
    //   this.rook_detecties[i] = "nee";
    // }
    // if (
    //   (this.lkm.observeerbaar === "nee")
    // ) {
    //   this.rook_detecties[] = ongeldig;
    // }
  },
};
Zichthandhaving_Verkeersbuis = function(){}
Zichthandhaving_Verkeersbuis.prototype = {
  BewaakZicht() {
    // TODO: SyntaxError: Unexpected identifier
    // if (
    //   (this.lkmvb.beschikbaarheid !== "niet_beschikbaar") &&
    //   (this.lkmvb.zichtmeting_max > this.zicht_grenswaarde_aan)
    // ) {
    //   this.lvvb.SetSensorregelingStand(8);
    //   En er mag pas "gestopt" worden met ventileren als de waarden onder de_zicht_grenswaarde_uit zitten:;
    // }
    // if (
    //   (this.lkmvb.beschikbaarheid !== "niet_beschikbaar") &&
    //   (this.lkmvb.zichtmeting_max < this.zicht_grenswaarde_uit)
    // ) {
    //   this.lvvb.SetSensorregelingStand(0);
    // }
  },
};
Rij_van_Vluchtdeuren = function(){}
Rij_van_Vluchtdeuren.prototype = {
  DisableDetectieVluchtdeurGesloten() {
    this.rv.EnableDetector( this.deur_index, "nee" );
  },
  EnableDetectieVluchtdeurGesloten() {
    this.rv.EnableDetector( this.deur_index, "ja" );
  },
};
Rij_van_VluchtDeurVergrendeling = function(){}
Rij_van_VluchtDeurVergrendeling.prototype = {
  SetOpAutobediening() {
    this.bedieningswijze = "auto";
  },
  SetOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze !== "hand")
    // ) {
    //   this.hand_stand = this.auto_stand this.bedieningswijze = "hand";
    // }
  },
  SetHandStand() {
    this.hand_stand= stand;
  },
  SetAutoStand() {
    this.auto_stand = stand;
  },
  HandhaafInstellingen() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.rvv.bestuurbaar === "ja") &&
    //   ((( this.bedieningswijze === "hand") &&
    //   (this.hand_stand === "vergrendeld" ) || ( this.bedieningswijze === "auto") &&
    //   (this.auto_stand === "vergrendeld" )))
    // ) {
    //   IF ( this.doel_vergrendeling !== "vergrendeld");
    //   THEN this.doel_vergrendeling = "vergrendeld" this.tijdstip_doel_vergrendeling = huidige_tijd;
    //   END_;
    //   IF this.rvv.Vergrendel();
    // }
    // if (
    //   (this.rvv.bestuurbaar === "ja") &&
    //   ((( this.bedieningswijze === "hand") &&
    //   (this.hand_stand === "ontgrendeld" )
    // || ( this.bedieningswijze === "auto") &&
    //   (this.auto_stand === "ontgrendeld" )))
    // ) {
    //   IF ( this.doel_vergrendeling !== "ontgrendeld");
    //   THEN this.doel_vergrendeling = "ontgrendeld" this.tijdstip_doel_vergrendeling = huidige_tijd;
    //   END_;
    //   IF this.rvv.Ontgrendel();
    // }
  },
};
Vluchtdeurindicatie = function(){}
Vluchtdeurindicatie.prototype = {
  SetContourverlichtingOpAutoBediening() {
    this.bedieningswijze_contourverlichting = "auto";
  },
  SetContourverlichtingOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze_contourverlichting !== "hand")
    // ) {
    //   this.hand_stand_contourverlichting = this.auto_stand_contourverlichting this.bedieningswijze_contourverlichting= "hand";
    // }
  },
  SetContourverlichtingHandStand() {
    this.hand_stand_contourverlichting = stand;
  },
  SetAlleGeluidsbakensOpAutoBediening() {
    this.bedieningswijze_geluidsbakens = "auto";
  },
  MuteAlleGeluidsbakens() {
    this.bedieningswijze_geluidsbakens = "hand";
  },
  SetDVIVOpAutobediening() {
    this.bedieningswijze_dVIV = "auto";
  },
  SetDVIVOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze_dVIV !== "hand")
    // ) {
    //   this.hand_stand_dVIV = this.auto_stand_dVIV this.bedieningswijze_dVIV = "hand";
    // }
  },
  SetDVIVHandStand() {
    this.hand_stand_dVIV = stand;
  },
  SetContourverlichtingAutoStand() {
    this.auto_stand_contourverlichting = stand;
  },
  SetGeluidsbakensAutoStand() {
    this.auto_stand_geluidsbakens = stand;
  },
  SetGeluidsbakenBoodschap() {
    this.geluidsbaken_boodschap = boodschap;
  },
  SpeelOpgenomenBoodschap() {
    if (
      (this.vi.bestuurbaar === "ja")
    ) {
      this.vi.SpeelOpgenomenBoodschap( boodschap );
    }
  },
  SetGeluidsbakenMuteStand() {
    this.geluidsbaken_muted = stand;
  },
  SetAutoStand() {
    this.auto_stand_geluidsbaken = stand;
  },
  SetDVIVAutoStand() {
    this.auto_stand_dVIV = stand;
  },
  HandhaafInstellingenContourverlichting() {
    if (
      (this.vi_contourverlichting.bestuurbaar === "ja") &&
      (this.bedieningswijze_contourverlichting === "hand") &&
      (this.hand_stand_contourverlichting === "uit")
    ) {
      this.vi_contourverlichting.Uit();
    }
    if (
      (this.vi_contourverlichting.bestuurbaar === "ja") &&
      (this.bedieningswijze_contourverlichting === "hand") &&
      (this.hand_stand_contourverlichting === "aan")
    ) {
      this.vi_contourverlichting.Aan();
    }
    if (
      (this.vi_contourverlichting.bestuurbaar === "ja") &&
      (this.bedieningswijze_contourverlichting === "auto") &&
      (this.auto_stand_contourverlichting === "uit")
    ) {
      this.vi_contourverlichting.Uit();
    }
    if (
      (this.vi_contourverlichting.bestuurbaar === "ja") &&
      (this.bedieningswijze_contourverlichting === "auto") &&
      (this.auto_stand_contourverlichting === "aan")
    ) {
      this.vi_contourverlichting.Aan();
    }
  },
  HerhaalGeluidsbakenBoodschap() {
    if (
      (this.geluidsbaken[i].status_geluidsbaken === "aan") &&
      (this.opgenomen_boodschap_id === ( "geen" | ongeldig ))
    ) {
      SpeelOpgenomenBoodschap( this.geluidsbaken_boodschap );
    }
  },
  HandhaafInstellingenAlleGeluidsbakens() {
    if (
      (this.bedieningswijze_geluidsbakens === "auto") &&
      (this.auto_stand_geluidsbakens === "aan")
    ) {
      this.geluidsbaken.forEach(i=>i.SetAutoStand("aan"));
    }
    if (
      (this.bedieningswijze_geluidsbakens === "hand" || this.auto_stand_geluidsbakens === "uit")
    ) {
      this.geluidsbaken.forEach(i=>i.SetAutoStand("uit"));
    }
  },
  HandhaafInstellingenGeluidsbaken() {
    if (
      (this.doel_stand === "uit") &&
      (this.vi_geluidsbaken.bestuurbaar === "ja")
    ) {
      this.vi_geluidsbaken.Uit();
    }
    if (
      (this.doel_stand === "aan") &&
      (this.vi_geluidsbaken.bestuurbaar === "ja")
    ) {
      this.vi_geluidsbaken.Aan();
    }
  },
  HandhaafInstellingenDVIV() {
    if (
      (this.dVIV.bestuurbaar === "ja") &&
      (this.bedieningswijze_dVIV === "hand") &&
      (this.hand_stand_dVIV === "uit")
    ) {
      this.dVIV.Uit();
    }
    if (
      (this.dVIV.bestuurbaar === "ja") &&
      (this.bedieningswijze_dVIV === "hand") &&
      (this.hand_stand_dVIV === ( "oplopend" | "aflopend" | "exit_overzijde" ))
    ) {
      this.dVIV.Aan(this.hand_stand_dVIV);
    }
    if (
      (this.dVIV.bestuurbaar === "ja") &&
      (this.bedieningswijze_dVIV === "auto") &&
      (this.auto_stand_dVIV === "uit")
    ) {
      this.dVIV.Uit();
    }
    if (
      (this.dVIV.bestuurbaar === "ja") &&
      (this.bedieningswijze_dVIV === "auto") &&
      (this.auto_stand_dVIV === ( "oplopend" | "aflopend" | "exit_overzijde" ))
    ) {
      this.dVIV.Aan(this.auto_stand_dVIV);
    }
  },
};
Hulpdienstpaneel = function(){}
Hulpdienstpaneel.prototype = {
  SelecteerKanaal() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.kanaal_id = kanaal_id this.kanaal_gewijzigd = "ja";
  },
  SetStand() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.doel_stand= stand this.stand_gewijzigd = "ja";
  },
  BewaakKanaal() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.kanaal_gewijzigd === "ja") &&
    //   (this.hdp.bestuurbaar === "ja") &&
    //   (this.kanaal_id !== ongeldig)
    // ) {
    //   this.kanaal_gewijzigd = "nee" this.hdp.SelecteerKanaal(this.kanaal_id);
    // }
  },
  BewaakStand() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.stand_gewijzigd === "ja") &&
    //   (this.hdp.bestuurbaar === "ja") &&
    //   (this.doel_stand !== ongeldig)
    // ) {
    //   this.stand_gewijzigd = "nee" this.hdp.SetStand(this.doel_stand);
    // }
  },
};
Koppeling_Wisselbaansysteem = function(){}
Koppeling_Wisselbaansysteem.prototype = {
  VerzendBericht() {
    if (
      (this.wbs_verzoek_getimeout === "nee")
    ) {
      this.te_verzenden_bericht = bericht;
    }
  },
  BewaakVerzoekTimeout() {
    if (
      (this.wbs_verzoek_getimeout === "ja") &&
      (this.wbs_wacht_op_antwoord === "ja") &&
      (this.transitiestatus !== "in_transitie")
    ) {
      this.te_verzenden_bericht = "onvolledig_uitgevoerd";
    }
  },
  VerwerkVerzendingBerichten() {
    if (
      (this.wbs_wacht_op_antwoord === "ja") &&
      (this.transitiestatus === "in_transitie") &&
      (this.wbs.bestuurbaar === "ja")
    ) {
      this.wbs.VerzendBericht(this.te_verzenden_bericht);
    }
  },
};
Klimaatregeling_Dienstgebouw = function(){}
Klimaatregeling_Dienstgebouw.prototype = {
};
Verlichting_Veilige_Ruimte = function(){}
Verlichting_Veilige_Ruimte.prototype = {
  SetOpAutobediening() {
    this.bedieningswijze = "auto";
  },
  SetOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze !== "hand")
    // ) {
    //   this.hand_stand = this.auto_stand this.bedieningswijze = "hand";
    // }
  },
  SetHandbedieningsStand() {
    this.hand_stand = stand;
  },
  SetAutobedieningsStand() {
    this.auto_stand = stand;
  },
  HandhaafInstellingen() {
    if (
      (this.vvr.bestuurbaar === "ja") &&
      (this.bedieningswijze === "auto") &&
      (this.auto_stand === "aan")
    ) {
      this.vvr.Aan();
    }
    if (
      (this.vvr.bestuurbaar === "ja") &&
      (this.bedieningswijze === "auto") &&
      (this.auto_stand === "uit")
    ) {
      this.vvr.Uit();
    }
    if (
      (this.vvr.bestuurbaar === "ja") &&
      (this.bedieningswijze === "hand") &&
      (this.hand_stand === "aan")
    ) {
      this.vvr.Aan();
    }
    if (
      (this.vvr.bestuurbaar === "ja") &&
      (this.bedieningswijze === "hand") &&
      (this.hand_stand === "uit")
    ) {
      this.vvr.Uit();
    }
  },
};
Kopdeur_MiddenTunnelKanaal = function(){}
Kopdeur_MiddenTunnelKanaal.prototype = {
};
Overdruk_Veilige_Ruimte = function(){}
Overdruk_Veilige_Ruimte.prototype = {
  SetOpAutobediening() {
    this.bedieningswijze = "auto";
  },
  SetOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze !== "hand")
    // ) {
    //   this.hand_stand = this.auto_stand this.bedieningswijze = "hand";
    // }
  },
  SetHandbedieningsStand() {
    this.hand_stand = stand;
  },
  EnableOverdruk() {
    this.enabled = "ja";
  },
  DisableOverdruk() {
    this.enabled = "nee";
  },
  SetAutobedieningsStand() {
    this.auto_stand = stand;
  },
  HandhaafInstellingen() {
    if (
      (this.enabled === "ja") &&
      (this.overdruk.bestuurbaar === "ja") &&
      (this.bedieningswijze === "auto") &&
      (this.auto_stand !== this.stand) &&
      (this.auto_stand !== ongeldig)
    ) {
      this.overdruk.SetStand( this.auto_stand );
    }
    if (
      (this.enabled === "ja") &&
      (this.overdruk.bestuurbaar === "ja") &&
      (this.bedieningswijze === "hand") &&
      (this.hand_stand !== this.stand) &&
      (this.hand_stand !== ongeldig)
    ) {
      this.overdruk.SetStand( this.hand_stand );
    }
    if (
      (this.enabled === "nee") &&
      (this.overdruk.bestuurbaar === "ja") &&
      (this.stand !== "uit")
    ) {
      this.overdruk.SetStand( "uit" );
    }
  },
};
Dynamische_Vluchtroute_Indicatie_Veilige_Ruimte = function(){}
Dynamische_Vluchtroute_Indicatie_Veilige_Ruimte.prototype = {
  SetOpAutobediening() {
    this.bedieningswijze = "auto";
  },
  SetOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze !== "hand")
    // ) {
    //   this.hand_stand = this.auto_stand this.hand_richting = this.auto_richting this.bedieningswijze = "hand";
    // }
  },
  SetHandbedieningsStandAan() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.hand_stand = "aan" this.hand_richting = richting;
  },
  SetHandbedieningsStandUit() {
    this.hand_stand = "uit";
  },
  SetAlleGeluidsbakensOpAutoBediening() {
    this.bedieningswijze_geluidsbakens = "auto";
  },
  MuteAlleGeluidsbakens() {
    this.bedieningswijze_geluidsbakens = "hand";
  },
  SetAlleVDAsOpAutoBediening() {
    this.bedieningswijze = "auto";
  },
  SetAlleVDAsOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze !== "hand")
    // ) {
    //   this.bedieningswijze = "hand" this.hand_stand = this.auto_stand;
    // }
  },
  SetEvacuatieZijde() {
    this.evacuatiezijde = zijde;
  },
  SetHandStand() {
    if (
      (this.bedieningswijze === "hand")
    ) {
      this.hand_stand = stand;
    }
  },
  SetAutobedieningsStandAan() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.auto_stand = "aan" this.auto_richting = richting;
  },
  SetAutobedieningsStandUit() {
    this.auto_stand = "uit";
  },
  SetGeluidsbakenMuteStand() {
    this.geluidsbaken_muted = stand;
  },
  SetAutoStand() {
    this.auto_stand = stand;
  },
  SetGeluidsbakensAutoStand() {
    // TODO: SyntaxError: Unexpected identifier
    // this.auto_stand_geluidsbakens = stand;
    // IF stand = "uit";
    // THEN this.aantal_boodschap_gespeeld = 0;
    // END_IF;
  },
  SetEvacuatierichting() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.evacuatierichting_langs = langs this.evacuatierichting_dwars = dwars;
  },
  SetGeluidsbakenBoodschap() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.geluidsbaken_boodschap !== boodschap)
    // ) {
    //   this.geluidsbaken_boodschap = boodschap this.aantal_boodschap_gespeeld = 0;
    // }
  },
  SpeelOpgenomenBoodschap() {
    if (
      (this.dvi.bestuurbaar === "ja")
    ) {
      this.dvi.SpeelOpgenomenBoodschap( boodschap );
    }
  },
  SetAan() {
    if (
      (this.vda.bestuurbaar === "ja")
    ) {
      this.vda.Aan();
      this.doel_stand = "aan";
    }
  },
  SetUit() {
    if (
      (this.vda.bestuurbaar === "ja")
    ) {
      this.vda.Uit();
      this.doel_stand = "uit";
    }
  },
  HandhaafInstellingen() {
    if (
      (this.dvi.bestuurbaar === "ja") &&
      (this.bedieningswijze === "auto") &&
      (this.auto_stand === "aan") &&
      (this.auto_richting !== ongeldig)
    ) {
      this.dvi.Aan(this.auto_richting);
    }
    if (
      (this.dvi.bestuurbaar === "ja") &&
      (this.bedieningswijze === "auto") &&
      (this.auto_stand === "uit")
    ) {
      this.dvi.Uit();
    }
    if (
      (this.dvi.bestuurbaar === "ja") &&
      (this.bedieningswijze === "hand") &&
      (this.hand_stand === "aan") &&
      (this.hand_richting !== ongeldig)
    ) {
      this.dvi.Aan(this.hand_richting);
    }
    if (
      (this.dvi.bestuurbaar === "ja") &&
      (this.bedieningswijze === "hand") &&
      (this.hand_stand === "uit")
    ) {
      this.dvi.Uit();
    }
  },
  HandhaafInstellingenGeluidsbaken() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   (this.bedieningswijze_geluidsbakens === "auto") &&
    //   (this.auto_stand_geluidsbakens === "aan")
    // ) {
    //   this.geluidsbaken_evacuatierichting.forEach(i=>i.SetAutoStand("aan"));
    //   i (this.geluidsbaken_evacuatierichting[] !== this.geluidsbaken[i] : this.geluidsbaken[i].SetAutoStand("uit"));
    // }
    // if (
    //   (this.bedieningswijze_geluidsbakens === "hand" || this.auto_stand_geluidsbakens === "uit")
    // ) {
    //   this.geluidsbaken.forEach(i=>i.SetAutoStand("uit"));
    // }
  },
  HerhaalGeluidsbakenBoodschap() {
    if (
      (this.geluidsbaken[i].status_geluidsbaken === "aan") &&
      (this.opgenomen_boodschap_id === ( "geen" | ongeldig ))
    ) {
      SpeelOpgenomenBoodschap( this.geluidsbaken_boodschap );
    }
  },
  TelAantalAfgespeeldeBoodschap() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.geluidsbaken[i].status_geluidsbaken === "aan") &&
    //   (this.opgenomen_boodschap_id === this.geluidsbaken_boodschap) &&
    //   (this.boodschap_spelend === "nee")
    // ) {
    //   this.boodschap_spelend = "ja";
    // }
    // if (
    //   (this.geluidsbaken[i].status_geluidsbaken === "aan") &&
    //   (this.opgenomen_boodschap_id === "geen") &&
    //   (this.boodschap_spelend === "ja")
    // ) {
    //   this.boodschap_spelend = "nee" this.aantal_boodschap_gespeeld = this.aantal_boodschap_gespeeld + 1;
    // }
    // if (
    //   (this.geluidsbaken[i].status_geluidsbaken === "aan") &&
    //   (this.opgenomen_boodschap_id === ongeldig)
    // ) {
    //   this.boodschap_spelend = "nee";
    // }
  },
  HandhaafInstellingenVDAs() {
    if (
      (this.vda[i].vluchtroute === this.evacuatiezijde) &&
      (this.doel_stand === "aan")
    ) {
      this.vda[i].SetAan();
    }
    if (
      (this.vda[i].vluchtroute !== this.evacuatiezijde)
    ) {
      this.vda[i].SetUit();
    }
    if (
      (this.doel_stand === "uit")
    ) {
      this.vda.forEach(i=>i.SetUit());
    }
  },
};
Omroep_Veilige_Ruimte = function(){}
Omroep_Veilige_Ruimte.prototype = {
  SetAfTeSpelenBoodschap() {
    // TODO: SyntaxError: Unexpected identifier
    // this.boodschap = boodschap;
    // IF periode > 0;
    // THEN this.herhalingsperiode = periode;
    // ELSE this.herhalingsperiode = this.herhalingsperiode[boodschap];
    // END_IF;
  },
  AfspelenBoodschap() {
    // TODO: SyntaxError: missing ) after argument list
    // this.sectie.forEach(i=>i.stand = "aan" this.gebruiksmode = "boodschap_afspelen" this.boodschap_continueren = "ja" this.boodschap_sectie = ALLE_SECTIES);
  },
  StopAfspelenBoodschap() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.gebruiksmode = "uit" this.boodschap_continueren = "nee";
  },
  AfspelenBoodschapOmroepSectie() {
    // TODO: SyntaxError: missing ) after argument list
    // this.sectie.forEach(i=>i.stand = "uit" this.sectie[omroepsectie].stand = "aan" this.gebruiksmode = "boodschap_afspelen" this.boodschap_continueren = "ja" this.boodschap_sectie = omroepsectie);
  },
  StopOmroepSectie() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.sectie[omroepsectie].stand = "uit" this.gebruiksmode = "uit" this.boodschap_continueren = "nee";
  },
  ToesprekenVeiligeRuimte() {
    // TODO: SyntaxError: missing ) after argument list
    // this.sectie.forEach(i=>i.stand = "aan" this.gebruiksmode = "toespreken");
  },
  ToesprekenOmroepSectie() {
    // TODO: SyntaxError: missing ) after argument list
    // if (
    //   (omroepsectie !== ongeldig)
    // ) {
    //   this.sectie.forEach(i=>i.stand = "uit" this.sectie[omroepsectie].stand = "aan" this.gebruiksmode = "toespreken");
    // }
  },
  StopToesprekenVeiligeRuimte() {
    // TODO: SyntaxError: missing ) after argument list
    // if (
    //   (this.gebruiksmode === "toespreken") &&
    //   (this.boodschap_continueren === "nee")
    // ) {
    //   this.gebruiksmode = "uit";
    // }
    // if (
    //   (this.gebruiksmode === "toespreken") &&
    //   (this.boodschap_continueren === "ja") &&
    //   (this.boodschap_sectie === ALLE_SECTIES)
    // ) {
    //   this.sectie .forEach(i=>i.stand = "aan" this.gebruiksmode = "boodschap_afspelen");
    // }
    // if (
    //   (this.gebruiksmode === "toespreken") &&
    //   (this.boodschap_continueren === "ja") &&
    //   (this.boodschap_sectie !== ongeldig) &&
    //   (this.boodschap_sectie !== ALLE_SECTIES)
    // ) {
    //   this.sectie .forEach(i=>i.stand = "uit" this.sectie [this.boodschap_sectie ].stand = "aan" this.gebruiksmode = "boodschap_afspelen");
    // }
  },
  StopOmroepVeiligeRuimte() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.gebruiksmode = "uit" this.boodschap_continueren = "nee";
  },
  StartAfspelenEnHerhalenBoodschappenVeiligeRuimte() {
    if (
      (this.gebruiksmode === "boodschap_afspelen") &&
      (this.omroep_vr.bestuurbaar === "ja") &&
      (this.omroep_vr.opgenomen_boodschap_id === "geen") &&
      (huidige_tijd - this.tijdstip_vorige_keer_afspelen > this.herhalingsperiode) &&
      (this.boodschap !== ongeldig)
    ) {
      this.omroep_vr.SpeelOpgenomenBoodschap(this.boodschap);
      this.tijdstip_vorige_keer_afspelen = huidige_tijd;
    }
  },
  BewaakStoppenAfspelenBoodschapVeiligeRuimte() {
    if (
      (this.gebruiksmode === "uit") &&
      (this.omroep_vr.bestuurbaar === "ja") &&
      (this.omroep_vr.opgenomen_boodschap_id !== "geen")
    ) {
      this.omroep_vr.StopOpgenomenBoodschap();
    }
  },
  BewaakToesprekenVeiligeRuimte() {
    if (
      (this.gebruiksmode === "toespreken") &&
      (this.omroep_vr.bestuurbaar === "ja") &&
      (this.omroep_vr.toespreken_actief === "nee")
    ) {
      this.omroep_vr.StopOpgenomenBoodschap();
      this.omroep_vr.StartToespreken();
    }
    if (
      (this.gebruiksmode !== ongeldig) &&
      (this.gebruiksmode !== "toespreken") &&
      (this.omroep_vr.bestuurbaar === "ja") &&
      (this.omroep_vr.toespreken_actief === "ja")
    ) {
      this.omroep_vr.StopToespreken();
    }
  },
  HandhaafOmroepSectieStand() {
    if (
      (this.omroepsectie.bestuurbaar === "ja") &&
      (this.omroepsectie.luidspreker_sectie_stand !== this.stand) &&
      (this.stand !== ongeldig)
    ) {
      this.omroepsectie.SetLuidsprekerSectieStand(this.stand);
    }
  },
};
GeluidsbakenMonitor_Veilige_Ruimte = function(){}
GeluidsbakenMonitor_Veilige_Ruimte.prototype = {
  MuteBakenBijOmroep() {
    if (
      (this.geluidsbaken.geluidsbaken_muted === "nee") &&
      (this.sectie[i].geluid_aan === "ja")
    ) {
      this.geluidsbaken.SetGeluidsbakenMuteStand( "ja" );
    }
  },
  UnmuteBakenBijOmroep() {
    // TODO: SyntaxError: Unexpected token ']'
    // if (
    //   (this.geluidsbaken.geluidsbaken_muted === "ja") &&
    //   (this.sectie[].geluid_aan === "nee")
    // ) {
    //   this.geluidsbaken.SetGeluidsbakenMuteStand( "nee" );
    // }
  },
};
Bluswatervoorziening = function(){}
Bluswatervoorziening.prototype = {
  SetHandVraag() {
    this.hand_vraag = stand;
  },
  EnablePomp() {
    this.jockeypomp.SetEnabled("ja");
  },
  DisablePomp() {
    this.jockeypomp.SetEnabled("nee");
  },
  SetAutoVraag() {
    this.auto_vraag = stand;
  },
  HandhaafInstellingen() {
    if (
      (this.bt.bestuurbaar === "ja") &&
      (this.doel_stand !== ongeldig)
    ) {
      this.bt.SetToestand(this.doel_stand);
    }
  },
};
Energievoorziening = function(){}
Energievoorziening.prototype = {
  brandstofniveau_nsa() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.nsa.observeerbaar === "ja" this.nsa.
    // this.opgeslagen_energiehoeveelheid > this.laag_niveau_brandstof this.nsa.
    // this.opgeslagen_energiehoeveelheid > this.bestel_niveau_brandstof this.brandstofniveau_nsa "ja" "ja" hoog "nee" "nee" laag "ja" "nee" bestelniveau)
    // ) {
    //   ;
    // }
  },
};
Intercom_Tunnel = function(){}
Intercom_Tunnel.prototype = {
  Enable() {
    this.toestel.SetEnabled("ja");
  },
  Disable() {
    this.toestel.SetEnabled("nee");
  },
};
C2000 = function(){}
C2000.prototype = {
};
Omroepsysteem_tunnel = function(){}
Omroepsysteem_tunnel.prototype = {
  SetVoorselectieActieveCamera() {
    SetSelectiewijze("actieve_camera_sectie");
  },
  SetVoorselectieVerkeersbuisOmroepsectie() {
    // TODO: SyntaxError: Unexpected string
    // this."verkeersbuis" = verkeersbuis_id this.omroepsectie = omroepsectie;
    // SetSelectiewijze("verkeersbuis_sectie");
  },
  SetVoorselectieVerkeersbuis() {
    // TODO: SyntaxError: Unexpected string
    // this."verkeersbuis" = verkeersbuis_id;
    // SetSelectiewijze("verkeersbuis");
  },
  SetVoorselectieVeiligeRuimte() {
    // TODO: SyntaxError: Unexpected string
    // this."veilige_ruimte" = veilige_ruimte_id;
    // SetSelectiewijze("veilige_ruimte");
  },
  SetVoorselectieVeiligeRuimteOmroepsectie() {
    // TODO: SyntaxError: Unexpected string
    // this."veilige_ruimte" = veilige_ruimte_id this.omroepsectie = omroepsectie;
    // SetSelectiewijze("veilige_ruimte_sectie");
  },
  SetVoorselectieGeheel() {
    SetSelectiewijze("geheel");
  },
  StartToespreken() {
    if (
      (this.selectiewijze === "actieve_camera_sectie")
    ) {
      ToesprekenVerkeersbuisActieveCamera();
    }
  },
  StopToespreken() {
    this.omroep_verkeersbuis.forEach(i=>i.StopToesprekenVerkeersbuis());
    this.omroep_veilige_ruimte.forEach(i=>i.StopToesprekenVeiligeRuimte());
  },
  AfspelenBoodschapVerkeersbuizen() {
    this.omroep_verkeersbuis.forEach(i=>i.SetAfTeSpelenBoodschap(opgenomen_boodschap_id, herhaalperiode));
    this.omroep_verkeersbuis.forEach(i=>i.AfspelenBoodschapVerkeersbuis());
  },
  StopAfspelenBoodschapVerkeersbuizen() {
    this.omroep_verkeersbuis.forEach(i=>i.StopAfspelenBoodschapVerkeersbuis());
  },
  AfspelenBoodschapVeiligeRuimtes() {
    this.omroep_veilige_ruimte.forEach(i=>i.SetAfTeSpelenBoodschap(boodschap, herhaalperiode));
    this.omroep_veilige_ruimte.forEach(i=>i.AfspelenBoodschap());
  },
  StopAfspelenBoodschapVeiligeRuimtes() {
    this.omroep_veilige_ruimte.forEach(i=>i.StopAfspelenBoodschap());
  },
  SetSelectiewijze() {
    // TODO: SyntaxError: Unexpected identifier
    // this.selectiewijze = type;
    // IF (this.selectiewijze !== "geen");
    // ;
    // THEN $ukvc8_koppelSpreektoets(this.omroep_referentie);
    // ELSE $ukvc8_koppelSpreektoets("geen");
    // END_IF;
  },
  ToesprekenVerkeersbuisActieveCamera() {
    // TODO: SyntaxError: Unexpected token ';'
    // this.omroep_verkeersbuis.forEach(i=>i.StopToesprekenVerkeersbuis());
    // this.omroep_veilige_ruimte.forEach(i=>i.StopToesprekenVeiligeRuimte());
    // this.omroep_verkeersbuis[this.cctv_tunnel.geselecteerde_verkeersbuis].;
    // ToesprekenOmroepSectie (this.omroep_cctv[this.cctv_tunnel.geselecteerde_verkeersbuis].
    // this.omroepsectie_actieve_camera);
  },
  ToesprekenVerkeersbuisOmroepsectie() {
    this.omroep_verkeersbuis.forEach(i=>i.StopToesprekenVerkeersbuis());
    this.omroep_veilige_ruimte.forEach(i=>i.StopToesprekenVeiligeRuimte());
    this.omroep_verkeersbuis["verkeersbuis"].ToesprekenOmroepSectie( omroepsectie );
  },
  ToesprekenVerkeersbuis() {
    this.omroep_verkeersbuis.forEach(i=>i.StopToesprekenVerkeersbuis());
    this.omroep_veilige_ruimte.forEach(i=>i.StopToesprekenVeiligeRuimte());
    this.omroep_verkeersbuis["verkeersbuis"].ToesprekenVerkeersbuis();
  },
  ToesprekenVeiligeRuimte() {
    this.omroep_verkeersbuis.forEach(i=>i.StopToesprekenVerkeersbuis());
    this.omroep_veilige_ruimte.forEach(i=>i.StopToesprekenVeiligeRuimte());
    this.omroep_veilige_ruimte["veilige_ruimte"].ToesprekenVeiligeRuimte();
  },
  ToesprekenVeiligeRuimteSectie() {
    this.omroep_verkeersbuis.forEach(i=>i.StopToesprekenVerkeersbuis());
    this.omroep_veilige_ruimte.forEach(i=>i.StopToesprekenVeiligeRuimte());
    this.omroep_veilige_ruimte["veilige_ruimte"].ToesprekenOmroepSectie(omroepsectie);
  },
  ToesprekenTunnelComplex() {
    this.omroep_verkeersbuis.forEach(i=>i.ToesprekenVerkeersbuis());
    this.omroep_veilige_ruimte.forEach(i=>i.ToesprekenVeiligeRuimte());
  },
  BewaakVoorselectie() {
    // TODO: SyntaxError: Unexpected token '&&'
    // if (
    //   (this.laatst_actieve_camera !== this.cctv_tunnel.actieve_camera)
    // ) {
    //   IF (this.cctv_tunnel.actieve_camera !== "geen");
    //   THEN;
    //   SetSelectiewijze("actieve_camera_sectie");
    //   ;
    //   ELSIF (this.cctv_tunnel.actieve_camera = "geen");
    //   &&
    //   (this.selectiewijze = "actieve_camera_sectie");
    //   THEN;
    //   SetSelectiewijze("geen");
    //   END_;
    //   IF this.laatst_actieve_camera = this.cctv_tunnel.actieve_camera;
    // }
  },
};
Telefoonvoorziening_Tunnel = function(){}
Telefoonvoorziening_Tunnel.prototype = {
};
Vloeistofpompinstallatie_Tunnel = function(){}
Vloeistofpompinstallatie_Tunnel.prototype = {
  SetRegimeOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze !== "hand")
    // ) {
    //   this.handbedieningsregime = this.autobedieningsregime this.bedieningswijze = "hand";
    // }
  },
  SetRegimeOpAutobediening() {
    if (
      (this.bedieningswijze !== "auto")
    ) {
      this.bedieningswijze = "auto";
    }
  },
  SetHandRegime() {
    this.handbedieningsregime = regime;
  },
  SetStand() {
    if (
      (this.pomp.bestuurbaar === "ja")
    ) {
      this.pomp.SetStand( stand );
    }
  },
  EnablePomp() {
    this.pomp.SetEnabled("ja");
  },
  DisablePomp() {
    this.pomp.SetEnabled("nee");
  },
  SetAfvoerkeuzeOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze_afvoerrichting !== "hand")
    // ) {
    //   this.hand_afvoerrichting = this.auto_afvoerrichting this.bedieningswijze_afvoerrichting = "hand";
    // }
  },
  SetAfvoerkeuzeOpAutobediening() {
    if (
      (this.bedieningswijze_afvoerrichting !== "auto")
    ) {
      this.bedieningswijze_afvoerrichting = "auto";
    }
  },
  SetHandAfvoerkeuze() {
    this.hand_afvoerrichting = richting;
  },
  SetAutoRegime() {
    this.autobedieningsregime = regime;
  },
  SetAutoAfvoerkeuze() {
    this.auto_afvoerrichting = richting;
  },
  HandhaafInstellingen() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.vpi.bestuurbaar === "ja") &&
    //   (this.doel_regime !== this.vpi.regime) &&
    //   (( ( this.opslag_type === vuilvloeistof) &&
    //   (this.doel_regime === ("lozingsschema" | "uit")) || ( this.opslag_type !== vuilvloeistof) &&
    //   (this.doel_regime === ("leeghouden" | "bergen" | "uit")) ))
    // ) {
    //   this.vpi.SetRegime(this.doel_regime);
    // }
    // if (
    //   (this.vpi.observeerbaar === "ja") &&
    //   (this.plaatselijk_bediend === "ja") &&
    //   ((this.handbedieningsregime !== this.doel_regime || this.bedieningswijze !== "hand")) &&
    //   (this.doel_regime !== ongeldig)
    // ) {
    //   this.handbedieningsregime = this.doel_regime this.bedieningswijze = "hand";
    // }
  },
  HandhaafKeuze() {
    if (
      (this.afvoerkeuze.bestuurbaar === "ja") &&
      (this.doel_afvoerrichting !== this.afvoerkeuze.afvoerrichting) &&
      (this.doel_afvoerrichting !== ongeldig)
    ) {
      this.afvoerkeuze.SetAfvoerRichting(this.doel_afvoerrichting);
    }
  },
};
CaDo = function(){}
CaDo.prototype = {
  Open() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.cado.bestuurbaar === "ja")
    // ) {
    //   this.doel_stand = "open" this.cado.Open();
    // }
  },
  Sluit() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.cado.bestuurbaar === "ja")
    // ) {
    //   this.doel_stand = "gesloten" this.cado.Sluit();
    // }
  },
  Stop() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.cado.bestuurbaar === "ja")
    // ) {
    //   this.doel_stand = "open_verlaten" this.cado.Stop();
    // }
  },
};
VeVa = function(){}
VeVa.prototype = {
  OntgrendelPlaatselijkeBediening() {
    if (
      (this.veva.bestuurbaar === "ja")
    ) {
      this.veva.SetVergrendeling("ontgrendeld");
    }
  },
  VergrendelPlaatselijkeBediening() {
    if (
      (this.veva.bestuurbaar === "ja") &&
      ((this.veva.stand === "midden" || this.veva.stand === "links" ||_veva.stand === "rechts"))
    ) {
      this.veva.SetVergrendeling("vergrendeld");
    }
  },
};
Beweegbare_Barrier = function(){}
Beweegbare_Barrier.prototype = {
  Open() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.barrier.bestuurbaar === "ja")
    // ) {
    //   this.doel_stand = "open" this.barrier.Open();
    // }
  },
  Sluit() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.barrier.bestuurbaar === "ja")
    // ) {
    //   this.doel_stand = "gesloten" this.barrier.Sluit();
    // }
  },
  Stop() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.barrier.bestuurbaar === "ja")
    // ) {
    //   this.doel_stand = "gedeeltelijk_gesloten" this.barrier.Stop();
    // }
  },
};
VerlichtToeritMonitor = function(){}
VerlichtToeritMonitor.prototype = {
  Monitor() {
    // TODO: SyntaxError: Unexpected token ']'
    // if (
    //   (this.CaDo[i].stand !== "gesloten" || this.BeBa[j].stand !== "open" || this.VeVa[k].vergrendelstatus === "ontgrendeld" || this.VeVa[k].stand !== "midden")
    // ) {
    //   this.verlichtingszone.SetMinimaleAutobedieningsStand(this.monitor_verlichting_stand);
    // }
    // if (
    //   (this.CaDo[].stand === "gesloten") &&
    //   (this.BeBa[].stand === "open") &&
    //   (this.VeVa[].vergrendelstatus !== "ontgrendeld") &&
    //   (this.VeVa[].stand === "midden")
    // ) {
    //   this.verlichtingszone.SetMinimaleAutobedieningsStand(0);
    // }
  },
};
CCTV_Tunnel = function(){}
CCTV_Tunnel.prototype = {
  SetActieveVerkeersbuis() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.cctv_verkeersbuis[vbnr].beschikbaarheid !== "niet_beschikbaar")
    // ) {
    //   this.cctv_verkeersbuis.forEach(i=>i.SetActieveKanaal("geen", "nee"));
    //   this.geselecteerde_verkeersbuis = vbnr this.cctv_verkeersbuis[vbnr].SetActieveKanaal(this.cctv_verkeersbuis[vbnr].laatste this.actieve_kanaal, "ja");
    // }
  },
  SetActieveKanaal(kanaal_id() {
    if (
      (kanaal_id === "geen")
    ) {
      this.cctv_verkeersbuis.forEach(i=>i.SetActieveKanaal("geen", aanvragen));
    }
    if (
      (this.cctv_verkeersbuis[v].kanalen[k].kanaal_id === kanaal_id)
    ) {
      SetActieveKanaalInVerkeersbuis(this.cctv_verkeersbuis[v].kanalen[k], v);
    }
  },
  SetActieveCamera(camera_id() {
    if (
      (this.cctv_verkeersbuis[v].camera[c].camera_id === camera_id)
    ) {
      this.cctv_verkeersbuis.forEach(i=>i.controlekanaal.SetStatus("verbergen"));
      this.cctv_verkeersbuis[v].controlekanaal.SelecteerCamera(this.cctv_verkeersbuis [v].camera[c]);
      this.cctv_verkeersbuis[v].controlekanaal.SetStatus("tonen");
      SetActieveKanaalInVerkeersbuis(this.cctv_verkeersbuis[v].controlekanaal, v);
    }
  },
  StopWeergaveActieveBeeld() {
    if (
      (this.actieve_kanaal !== "geen")
    ) {
      StopWeergaveBeeld(this.actieve_kanaal);
      SetActieveKanaal("geen", "ja");
    }
  },
  SetControleCameraMetPresetActief(camera_id() {
    // TODO: SyntaxError: missing ) after argument list
    // if (
    //   (this.cctv_verkeersbuis[v].camera[c].camera_id === camera_id)
    // ) {
    //   this.cctv_verkeersbuis.forEach(i=>i.controlekanaal.SetStatus("verbergen"));
    //   this.cctv_verkeersbuis[v].controlekanaal.SelecteerCameraMetPreset(this.cctv_ver keersbuis[v].camera[c], camera_preset);
    //   this.cctv_verkeersbuis[v].controlekanaal.SetStatus("tonen");
    //   SetActieveKanaalInVerkeersbuis(this.cctv_verkeersbuis[v].controlekanaal, v);
    // }
  },
  SetVerkeersbuisDetailKanaalDerden() {
    // TODO: SyntaxError: Unexpected token ')'
    // this.hdp_verkeersbuis.forEach(i=>i.);
    // SelecteerKanaal(this.cctv_verkeersbuis[vbnr].detailkanaal.kanaal_id);
    // this.bvm_tunnel.;
    // SelecteerKanaal(this.cctv_verkeersbuis[vbnr].detailkanaal.kanaal_id);
  },
  SetDoorgifteKanaalDerden() {
    this.hdp_verkeersbuis.forEach(i=>i.SetStand( stand ));
    this.bvm_tunnel.SetStand( stand );
  },
  Draai() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].beschikbaarheid !== "niet_beschikbaar") &&
    //   (this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].actieve_kanaal !== "geen")
    // ) {
    //   this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].actieve_kanaal.camera.;
    //   Draai(graden);
    // }
  },
  Neig() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].beschikbaarheid !== "niet_beschikbaar") &&
    //   (this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].actieve_kanaal !== "geen")
    // ) {
    //   this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].actieve_kanaal.camera.;
    //   Neig(graden);
    // }
  },
  Zoom() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].beschikbaarheid !== "niet_beschikbaar") &&
    //   (this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].actieve_kanaal !== "geen")
    // ) {
    //   this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].actieve_kanaal.camera.;
    //   Zoom(zoom);
    // }
  },
  Focus() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].beschikbaarheid !== "niet_beschikbaar") &&
    //   (this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].actieve_kanaal !== "geen")
    // ) {
    //   this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].actieve_kanaal.camera.;
    //   Focus(focus);
    // }
  },
  TegenlichtCompensatie() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].beschikbaarheid !== "niet_beschikbaar") &&
    //   (this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].actieve_kanaal !== "geen")
    // ) {
    //   this.cctv_verkeersbuis[this.geselecteerde_verkeersbuis].actieve_kanaal.camera.;
    //   TegenlichtCompensatie(diafragma);
    // }
  },
  SetActieveKanaalInVerkeersbuis(kanaal() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.cctv_verkeersbuis.forEach(i=>i.SetActieveKanaal("geen", "nee"));
    // this.geselecteerde_verkeersbuis = vbnr this.cctv_verkeersbuis[vbnr].SetActieveKanaal(kanaal, "ja");
  },
  StopWeergaveBeeld(kanaal_id() {
    if (
      (this.cctv_verkeersbuis[v].controlekanaal.kanaal_id === kanaal_id)
    ) {
      this.cctv_verkeersbuis[v].controlekanaal.SetStatus("verbergen");
    }
    if (
      (this.cctv_verkeersbuis[v].parkeerbeeld_kanalen[k].kanaal_id === kanaal_id)
    ) {
      this.cctv_verkeersbuis[v].parkeerbeeld_kanalen[k].OntkoppelCamera("ja");
      this.cctv_verkeersbuis[v].parkeerbeeld_kanalen[k].OntkoppelHistorischBeeld();
    }
    if (
      (this.cctv_verkeersbuis[v].alarmkanalen[k].kanaal_id === kanaal_id)
    ) {
      this.cctv_verkeersbuis[v].alarmkanalen.forEach(i=>i.SetStatus("verbergen"));
    }
    if (
      (this.cctv_verkeersbuis[v].schouwkanalen[k].kanaal_id === kanaal_id)
    ) {
      this.cctv_verkeersbuis[v].StopSchouwen();
    }
  },
  OntkoppelKanaal(kanaal_id() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.cctv_verkeersbuis[v].kanalen[k].kanaal_id === kanaal_id)
    // ) {
    //   IF this.cctv_verkeersbuis[v].kanalen[k].camera !== "geen";
    //   THEN this.cctv_verkeersbuis[v].kanalen[k].OntkoppelCamera("nee");
    //   ;
    //   ELSIF this.cctv_verkeersbuis[v].kanalen[k].historische_beeldenbron !== "geen";
    //   THEN this.cctv_verkeersbuis[v].kanalen[k].OntkoppelHistorischBeeld();
    //   END_;
    //   IF this.cctv_verkeersbuis[v].kanalen[k].SetStatus("verbergen");
    // }
  },
  KopieerKanaal(van_kanaal_id() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   ((this.cctv_verkeersbuis[i].kanalen[v].kanaal_id === van_kanaal_id)) &&
    //   ((this.cctv_verkeersbuis[i].kanalen[n].kanaal_id === naar_kanaal_id))
    // ) {
    //   IF this.cctv_verkeersbuis[i].kanalen[v].camera !== "geen";
    //   THEN this.cctv_verkeersbuis[i].kanalen[n].KoppelCamera( this.cctv_verkeersbuis[i].kanalen[v].camera, "nee");
    //   END_;
    //   IF this.cctv_verkeersbuis[i].kanalen[n].SetStatus("tonen");
    // }
  },
};
Basisfunctie_Bediening = function(){}
Basisfunctie_Bediening.prototype = {
  Start() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.beschikbaarheid !== "niet_beschikbaar") &&
    //   (this.bedienend === "nee")
    // ) {
    //   this.herhalingsperiode_alivecheck = herhalingsperiode_alivecheck this.alive_status = "goed" this.bedienend = "ja";
    // }
  },
  Stop() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.beschikbaarheid !== "niet_beschikbaar") &&
    //   (this.bedienend === "ja")
    // ) {
    //   this.bedienend = "nee" this.alive_status = "goed";
    // }
  },
  SetAliveStatus() {
    this.alive_status = alivecheck;
  },
  MonitorView() {
    this.tijdstip_laatste_check = tijdstip;
  },
  SendAlive() {
    // TODO: SyntaxError: Unexpected token '&&'
    // if (
    //   ((huidige_tijd - this.tijdstip_vorige_alivecheck > this.herhalingsperiode_alivecheck))
    // ) {
    //   this.tijdstip_vorige_alivecheck = huidige_tijd;
    //   IF (this.bedienend = "ja");
    //   &&
    //   (this.taak_id = "to_actief");
    //   THEN $ukvc8_monitorTaak(this.taak_id);
    //   END_IF;
    // }
  },
};
Bedieningscoordinatie = function(){}
Bedieningscoordinatie.prototype = {
  SetActieveBediening(taak_id() {
    this.actieve_taak_id = taak_id;
  },
  SetBeschikbaarheid() {
    this.beschikbaarheid_gui = beschikbaarheid;
  },
  SetTijdstipLaatsteCheck() {
    this.tijdstip_laatste_check = tijdstip;
  },
  BewaakBediening() {
    if (
      (this.bediening[this.actieve_taak_id].beschikbaarheid === "niet_beschikbaar") &&
      (this.tijdstip_uitval_gedetecteerd === ongeldig)
    ) {
      this.tijdstip_uitval_gedetecteerd = huidige_tijd;
    }
    if (
      (this.bediening[this.actieve_taak_id].beschikbaarheid !== "niet_beschikbaar") &&
      (this.tijdstip_uitval_gedetecteerd !== ongeldig)
    ) {
      this.tijdstip_uitval_gedetecteerd = ongeldig;
    }
    if (
      (huidige_tijd - this.tijdstip_uitval_gedetecteerd > this.max_tijd_zonder_bediening)
    ) {
      this.verkeersbuisafsluiter.forEach(i=>i.Auto_Dicht());
    }
  },
};
Beeldvoorziening_Meldkamer_Tunnel = function(){}
Beeldvoorziening_Meldkamer_Tunnel.prototype = {
  SetStand() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.doel_stand = stand this.stand_gewijzigd = "ja";
  },
  SelecteerKanaal() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.kanaal_id = kanaal_id this.kanaal_gewijzigd = "ja";
  },
  BewaakStand() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.stand_gewijzigd === "ja") &&
    //   (this.bvm.bestuurbaar === "ja") &&
    //   (this.doel_stand !== ongeldig)
    // ) {
    //   this.stand_gewijzigd = "nee" this.bvm.SetStand(this.doel_stand);
    // }
  },
  BewaakKanaal() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.kanaal_gewijzigd === "ja") &&
    //   (this.bvm.bestuurbaar === "ja") &&
    //   (this.kanaal_id !== ongeldig)
    // ) {
    //   this.kanaal_gewijzigd = "nee" this.bvm.SelecteerKanaal(this.kanaal_id);
    // }
  },
};
Overdrukvoorziening_Grensruimte = function(){}
Overdrukvoorziening_Grensruimte.prototype = {
  SetOpAutobediening() {
    this.bedieningswijze = "auto";
  },
  SetOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze !== "hand")
    // ) {
    //   this.hand_stand = this.auto_stand this.bedieningswijze = "hand";
    // }
  },
  SetHandbedieningsStand() {
    this.hand_stand = stand;
  },
  SetAutobedieningsStand() {
    this.auto_stand = stand;
  },
  HandhaafInstellingen() {
    if (
      (this.overdruk.bestuurbaar === "ja") &&
      (this.bedieningswijze === "auto") &&
      (this.overdruk.stand !== this.auto_stand) &&
      (this.auto_stand !== ongeldig)
    ) {
      this.overdruk.SetStand(this.auto_stand);
    }
    if (
      (this.overdruk.bestuurbaar === "ja") &&
      (this.bedieningswijze === "hand") &&
      (this.overdruk.stand !== this.hand_stand) &&
      (this.hand_stand !== ongeldig)
    ) {
      this.overdruk.SetStand(this.hand_stand);
    }
  },
};
Koppeling_Externe_Systemen_Tunnel = function(){}
Koppeling_Externe_Systemen_Tunnel.prototype = {
  SetAfsluitstatusVerkeersbuis() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.kes.bestuurbaar === "ja")
    // ) {
    //   this.status["verkeersbuis", richting] = status this.toestand["verkeersbuis"] = toestand;
    // }
  },
  HandhaafInstellingen() {
    // TODO: SyntaxError: Unexpected token ')'
    // if (
    //   (this.kes.bestuurbaar === "ja")
    // ) {
    //   this.kes.SetAfsluitstatusVerkeersbuis(i, j, this.status[i,j], this.toestand[i]);
    //   );
    // }
  },
};
Noodbediening = function(){}
Noodbediening.prototype = {
};
Waarschuwingsinstallatie_Dienstruimtes_Tunnel = function(){}
Waarschuwingsinstallatie_Dienstruimtes_Tunnel.prototype = {
  SetOntruimingsalarmVeilig() {
    if (
      (this.waarschuwingsinstallatie.bestuurbaar === "ja")
    ) {
      this.waarschuwingsinstallatie.SetWaarschuwingsalarm("veilig");
    }
  },
  SetOntruimingsalarmBeperktVeilig() {
    if (
      (this.waarschuwingsinstallatie.bestuurbaar === "ja")
    ) {
      this.waarschuwingsinstallatie.SetWaarschuwingsalarm("beperkt_veilig");
    }
  },
  SetOntruimingsalarmOnveilig() {
    if (
      (this.waarschuwingsinstallatie.bestuurbaar === "ja")
    ) {
      this.waarschuwingsinstallatie.SetWaarschuwingsalarm("onveilig");
    }
  },
  SetOntruimingsalarmUit() {
    if (
      (this.waarschuwingsinstallatie.bestuurbaar === "ja")
    ) {
      this.waarschuwingsinstallatie.SetWaarschuwingsalarm("uit");
    }
  },
};
Brandmeldinstallatie = function(){}
Brandmeldinstallatie.prototype = {
};
Event_recording = function(){}
Event_recording.prototype = {
  FilterEvents() {
    if (
      (this.er.bestuurbaar === "ja")
    ) {
      this.er.FilterEvents(filter_settings);
      this.filtered_events = this.er.filtered_events;
    }
  },
  RecordEvent() {
    if (
      (this.er.bestuurbaar === "ja")
    ) {
      this.er.Record(event);
    }
  },
};
Verkeersbuis = function(){}
Verkeersbuis.prototype = {
  VrijgaveVoorBedrijfNormaal() {
    if (
      (this.substate === "bedrijf_standby") &&
      (this.mogelijke_standby === "nee")
    ) {
      this.substate = "bedrijf_normaal";
      NaarNormaal();
    }
    if (
      (this.substate === ( "gestart" | "onderhoud_regulier" | "onderhoud_herstel" | "bedrijf_normaal" ))
    ) {
      this.substate = "bedrijf_normaal";
      NaarBedrijf();
      NaarNormaal();
    }
  },
  AnnuleerCalamiteit() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.bediening_zegt_calamiteit = "nee" this.tijdstip_onderdrukken_calamiteit = huidige_tijd;
  },
  GaNaarCalamiteit() {
    this.bediening_zegt_calamiteit = "ja";
  },
  CalamiteitVolledig() {
    if (
      (this.substate === "calamiteit_evacuatie")
    ) {
      this.substate = "calamiteit_volledig";
      NaarVolledig();
    }
    if (
      (this.substate === ( "gestart" | "bedrijf_normaal" | "bedrijf_standby" | "onderhoud_regulier" | "onderhoud_herstel" | "calamiteit_volledig" ))
    ) {
      this.substate = "calamiteit_volledig";
      NaarCalamiteit( this.rijrichting );
      NaarVolledig();
    }
  },
  Evacueer() {
    if (
      (this.substate === "calamiteit_volledig")
    ) {
      this.substate = "calamiteit_evacuatie";
      NaarEvacuatie();
    }
  },
  HerstelNaCalamiteit() {
    if (
      (this.substate === ( "calamiteit_volledig" | "onderhoud_regulier" | "onderhoud_herstel" ))
    ) {
      ;
    }
  },
  OnderhoudRegulier() {
    if (
      (this.substate === "onderhoud_herstel")
    ) {
      this.substate = "onderhoud_regulier";
      NaarRegulier();
    }
    if (
      (this.substate === ( "gestart" | "bedrijf_normaal" | "onderhoud_regulier" ))
    ) {
      this.substate = "onderhoud_regulier";
      NaarOnderhoud();
      NaarRegulier();
    }
  },
  ResetOnderdrukkingen() {
    this.signaleringen.forEach(i=>i.StopOnderdrukken());
  },
  SetRijrichting() {
    this.rijrichting = richting;
  },
  BedrijfNormaal_naar_BedrijfStandby() {
    if (
      (this.substate === "bedrijf_normaal")
    ) {
      this.substate = "bedrijf_standby";
      NaarStandby();
    }
  },
  CalamiteitOndersteunend() {
    if (
      (this.substate === ( "gestart" | "bedrijf_normaal" | "bedrijf_standby" | "onderhoud_regulier" | "onderhoud_herstel" ))
    ) {
      this.substate = "calamiteit_ondersteunend";
      NaarCalamiteit(rijrichting_calamiteitenbuis);
      NaarOndersteunend();
    }
  },
  OnderhoudHerstelNaCalamiteit() {
    if (
      (this.substate === ( "calamiteit_volledig" | "calamiteit_ondersteunend" | "onderhoud_herstel" )) &&
      (this.mogelijke_calamiteit === "nee")
    ) {
      this.substate = "onderhoud_herstel";
      NaarOnderhoud();
      NaarHerstelNaCalamiteit();
    }
    if (
      (this.substate === "onderhoud_regulier")
    ) {
      this.substate = "onderhoud_herstel";
      NaarHerstelNaCalamiteit();
    }
  },
  NaarBedrijf() {
    // TODO: SyntaxError: Unexpected token ';'
    // this.rijrichting_calamiteitenbuis = ongeldig;
    // ResetOnderdrukkingen();
    // this.cctv.camera.forEach(i=>i.SetGeblokkeerd( "nee" ));
    // this.cctv.SetRichtingCameras( "mee" );
    // this.cctv.CalamiteitBeeldenSetUit();
    // this.sos.AutoStopOnderdrukkenMeldingen();
    // this.omroep.StopOmroepVerkeersbuis();
    // this.hf.SpeelRadioInVerkeersbuis();
    // this.ventilatie.SetOnbalansBeveiliging( "aan" );
    // this.ventilatie.SetTemperatuurBeveiliging( "aan" );
    // this.vluchtdeurindicatie.contourverlichting.SetContourverlichtingAutoStand( "uit" );
    // this.vluchtdeurindicatie.contourverlichting.SetContourverlichtingOpAutoBediening();
    // this.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    // SetGeluidsbakensAutoStand( "uit" );
    // this.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    // SetAlleGeluidsbakensOpAutoBediening();
    // this.vluchtdeurindicatie.dVIV.forEach(i=>i.SetDVIVAutoStand("exit_overzijde"));
    // this.vluchtdeurindicatie.dVIV.forEach(i=>i.SetDVIVOpAutobediening());
  },
  NaarNormaal() {
    // TODO: SyntaxError: Unexpected token ';'
    // this.cctv.beeldregistratiesysteem.StopPermanenteOpslag();
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetAutomatischeRegelingAutobedieningsStand( "aan" );
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetOpAutobediening();
    // this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    // SetAutomatischeRegelingAutobedieningsStand( "aan" );
    // this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    // SetOpAutobediening();
    // this.ventilatie.SetAutobedieningsRichting( this.rijrichting );
    // this.ventilatie.SetAutobedieningsStand( "sensorregeling" );
    // this.ventilatie.SetGeheelOpAutobediening();
  },
  NaarStandby() {
    // TODO: SyntaxError: Unexpected token ';'
    // this.cctv.beeldregistratiesysteem.StartPermanenteOpslag();
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetAutobedieningsStand( this.gesloten_deel_standby_verlichtingsstand );
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetAutomatischeRegelingAutobedieningsStand( "uit" );
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetOpAutobediening();
    // this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    // SetAutobedieningsStand( this.niet_gesloten_deel_standby_verlichtingsstand );
    // this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    // SetAutomatischeRegelingAutobedieningsStand( "uit" );
    // this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    // SetOpAutobediening();
    // this.ventilatie.SetAutobedieningsRichting( this.rijrichting );
    // this.ventilatie.SetAutobedieningsStand( this.standby_ventilatiestand );
    // this.ventilatie.SetGeheelOpAutobediening();
  },
  NaarOnderhoud() {
    // TODO: SyntaxError: Unexpected token ';'
    // this.rijrichting_calamiteitenbuis = ongeldig;
    // ResetOnderdrukkingen();
    // this.cctv.camera.forEach(i=>i.SetGeblokkeerd( "nee" ));
    // this.cctv.beeldregistratiesysteem.StopPermanenteOpslag();
    // this.cctv.CalamiteitBeeldenSetUit();
    // this.sos.AutoStartOnderdrukkenMeldingen();
    // this.omroep.StopOmroepVerkeersbuis();
    // this.hf.SpeelRadioInVerkeersbuis();
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetAutobedieningsStand( this.gesloten_deel_onderhoud_verlichtingsstand );
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetAutomatischeRegelingAutobedieningsStand( "uit" );
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetOpAutobediening();
    // this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    // SetAutomatischeRegelingAutobedieningsStand( "aan" );
    // this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    // SetOpAutobediening();
    // this.ventilatie.SetOnbalansBeveiliging( "aan" );
    // this.ventilatie.SetTemperatuurBeveiliging( "aan" );
    // this.ventilatie.SetAutobedieningsRichting( this.rijrichting );
    // this.ventilatie.SetAutobedieningsStand( this.onderhoud_ventilatiestand );
    // this.ventilatie.SetGeheelOpAutobediening();
    // this.rij_van_vluchtdeuren.vluchtdeur.forEach(i=>i.Alarm_VluchtdeurNietGesloten.);
    // StartOnderdrukken();
    // this.vluchtdeurindicatie.contourverlichting.SetContourverlichtingAutoStand( "uit" );
    // this.vluchtdeurindicatie.contourverlichting.SetContourverlichtingOpAutoBediening();
    // this.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    // SetGeluidsbakensAutoStand( "uit" );
    // this.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    // SetAlleGeluidsbakensOpAutoBediening();
    // this.vluchtdeurindicatie.dVIV.forEach(i=>i.SetDVIVAutoStand("exit_overzijde"));
    // this.vluchtdeurindicatie.dVIV.forEach(i=>i.SetDVIVOpAutobediening());
  },
  NaarRegulier() {
    this.hulppost.forEach(i=>i.Alarm_HulppostDeurOpen.StopOnderdrukken());
    this.hulppost.forEach(i=>i.Alarm_BlusapparaatUitgenomen.StopOnderdrukken());
    this.hulppost.forEach(i=>i.Alarm_BrandslanghaspelUitHouderGenomen.StopOnderdrukken());
  },
  NaarHerstelNaCalamiteit() {
    this.hulppost.forEach(i=>i.Alarm_HulppostDeurOpen.StartOnderdrukken());
    this.hulppost.forEach(i=>i.Alarm_BlusapparaatUitgenomen.StartOnderdrukken());
    this.hulppost.forEach(i=>i.Alarm_BrandslanghaspelUitHouderGenomen.StartOnderdrukken());
  },
  NaarCalamiteit() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.tijdstip_calamiteit = huidige_tijd this.rijrichting_calamiteitenbuis = rijrichting_calamiteitenbuis;
    // ResetOnderdrukkingen();
    // ;
    // IF this.cctv.laatste_actieve_kanaal !== "geen";
    // THEN this.cctv.detailkanaal.SelecteerCamera(this.cctv.laatste_actieve_kanaal.camera);
    // ELSE this.cctv.detailkanaal.SelecteerCamera("geen");
    // END_;
    // IF this.cctv.camera.forEach(i=>i.SetGeblokkeerd( "nee" ));
    // this.cctv.beeldregistratiesysteem.StartPermanenteOpslag();
    // this.sos.AutoStartOnderdrukkenMeldingen();
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetOpAutobedieningZonderWijzigingen();
    // this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    // SetOpAutobedieningZonderWijzigingen();
    // this.verkeersbuisafsluiter_in_gebruik.Auto_Dicht();
    // this.ventilatie.SetOnbalansBeveiliging( "uit" );
    // this.ventilatie.SetTemperatuurBeveiliging( "uit" );
    // this.ventilatie.SetAutobedieningsRichting( rijrichting_calamiteitenbuis );
    // this.ventilatie.SetGeheelOpAutobediening();
    // this.vluchtdeurindicatie.dVIV.forEach(i=>i.SetDVIVAutoStand("exit_overzijde"));
    // this.vluchtdeurindicatie.dVIV.forEach(i=>i.SetDVIVOpAutobediening());
  },
  NaarVolledig() {
    // TODO: SyntaxError: Unexpected token ';'
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetAutobedieningsStand(this.gesloten_deel_calamiteit_verlichtingsstand);
    // this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    // SetAutomatischeRegelingAutobedieningsStand( "uit" );
    // this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    // SetAutobedieningsStand(this.niet_gesloten_deel_calamiteit_verlichtingsstand);
    // this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    // SetAutomatischeRegelingAutobedieningsStand( "uit" );
    // this.omroep.StopOmroepVerkeersbuis();
    // this.hf.SpeelRadioInVerkeersbuis();
    // this.ventilatie.SetAutobedieningsStand( this.calamiteit_ventilatiestand );
    // this.vluchtdeurindicatie.contourverlichting.SetContourverlichtingAutoStand( "uit" );
    // this.vluchtdeurindicatie.contourverlichting.SetContourverlichtingOpAutoBediening();
    // this.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    // SetGeluidsbakensAutoStand( "uit" );
    // this.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    // SetAlleGeluidsbakensOpAutoBediening();
    // this.cctv.CalamiteitBeeldenSetAan();
  },
  NaarOndersteunend() {
    // TODO: SyntaxError: Unexpected token ';'
    // this.omroep.StopOmroepVerkeersbuis();
    // this.hf.SpeelRadioInVerkeersbuis();
    // this.ventilatie.SetAutobedieningsStand( this.ondersteunend_ventilatiestand );
    // this.vluchtdeurindicatie.contourverlichting.SetContourverlichtingAutoStand( "uit" );
    // this.vluchtdeurindicatie.contourverlichting.SetContourverlichtingOpAutoBediening();
    // this.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    // SetGeluidsbakensAutoStand( "uit" );
    // this.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    // SetAlleGeluidsbakensOpAutoBediening();
    // this.cctv.CalamiteitBeeldenSetUit();
  },
  NaarEvacuatie() {
    // TODO: SyntaxError: Unexpected token ';'
    // this.omroep.SetAfTeSpelenBoodschap( this.boodschap_calamiteit, this.boodschap_herhalingsperiode );
    // this.omroep.AfspelenBoodschapVerkeersbuis();
    // this.hf.MuteRadioInVerkeersbuis();
    // this.vluchtdeurindicatie.contourverlichting.SetContourverlichtingAutoStand( "aan" );
    // this.vluchtdeurindicatie.contourverlichting.SetContourverlichtingOpAutoBediening();
    // this.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    // SetGeluidsbakensAutoStand( "aan" );
    // this.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    // SetAlleGeluidsbakensOpAutoBediening();
    // this.cctv.CalamiteitBeeldenSetAan();
  },
  HandhaafAfsluitstatusKoppelingExterneSystemen() {
    this.kes.SetAfsluitstatusVerkeersbuis(this.id, this.rijrichting, this.verkeersbuisafsluiter_in_gebruik.verkeersbuisafsluiter_status, this.substate);
  },
  BewaakStandby() {
    if (
      (this.mogelijke_standby === "ja") &&
      (this.substate === "bedrijf_normaal")
    ) {
      BedrijfNormaal_naar_BedrijfStandby();
    }
  },
  VertragingVerlichtingBijCalamiteitOndersteunend() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.substate === "calamiteit_ondersteunend") &&
    //   (huidige_tijd > this.tijdstip_verkeersvrij - this.verkeersbuisverlichting.gesloten_deel_verlichting.max_transitietijd)
    // ) {
    //   this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    //   SetAutobedieningsStand(this.gesloten_deel_calamiteit_verlichtingsstand );
    //   this.verkeersbuisverlichting.gesloten_deel_verlichting.;
    //   SetAutomatischeRegelingAutobedieningsStand( "uit" );
    //   this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    //   SetAutobedieningsStand(this.niet_gesloten_deel_calamiteit_verlichtingsstand );
    //   this.verkeersbuisverlichting.niet_gesloten_deel_verlichting.;
    //   SetAutomatischeRegelingAutobedieningsStand( "uit" );
    // }
  },
};
Veilige_Ruimte = function(){}
Veilige_Ruimte.prototype = {
  ResetOnderdrukkingen() {
    this.signaleringen.forEach(i=>i.StopOnderdrukken());
  },
  NaarOnderhoud() {
    this.state = "onderhoud";
    GezamenlijkeActiesNaarOnderhoudEnNormaal();
  },
  NaarNormaal() {
    this.state = "normaal";
    GezamenlijkeActiesNaarOnderhoudEnNormaal();
  },
  NaarVluchtVoorbereid() {
    this.state = "vlucht_voorbereid";
    GezamenlijkeActiesVluchtVoorbereidEnVluchtGereed(evacuatie_richting, incidentbuis);
  },
  NaarVluchtGereed() {
    this.state = "vlucht_gereed";
    ResetOnderdrukkingen();
    GezamenlijkeActiesVluchtVoorbereidEnVluchtGereed(evacuatie_richting, calamiteitenbuis);
  },
  NaarEvacuatie() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.state === "vlucht_gereed")
    // ) {
    //   this.state = "evacuatie";
    //   IF this."dwarsverbindingen" = "nee";
    //   THEN this.omroep_veilige_ruimte.AfspelenBoodschap();
    //   END_;
    //   IF this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    //   SetGeluidsbakensAutoStand("aan");
    //   this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    //   SetAlleGeluidsbakensOpAutoBediening();
    //   this.dynamische_vluchtroute_indicatie.gvda.forEach(i=>i.SetEvacuatieZijde(this.evacuatie_zijde));
    //   this.dynamische_vluchtroute_indicatie.gvda.forEach(i=>i.SetAutoStand("aan"));
    //   this.dynamische_vluchtroute_indicatie.gvda.forEach(i=>i.SetAlleVDAsOpAutoBediening());
    // }
  },
  GezamenlijkeActiesNaarOnderhoudEnNormaal() {
    // TODO: SyntaxError: Unexpected token ')'
    // ResetOnderdrukkingen();
    // this.omroep_veilige_ruimte.StopOmroepVeiligeRuimte();
    // this.verlichting_veilige_ruimte.SetAutobedieningsStand( "uit" );
    // this.verlichting_veilige_ruimte.SetOpAutobediening();
    // this.overdruk_veilige_ruimte.SetAutobedieningsStand( "uit" );
    // this.overdruk_veilige_ruimte.SetOpAutobediening();
    // this.RvVDV.forEach(i=>i.SetAutoStand("ontgrendeld"));
    // this.RvVDV.forEach(i=>i.SetOpAutobediening());
    // this.dynamische_vluchtroute_indicatie.SetAutobedieningsStandUit();
    // this.dynamische_vluchtroute_indicatie.SetOpAutobediening();
    // this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    // SetGeluidsbakensAutoStand("uit");
    // this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    // SetAlleGeluidsbakensOpAutoBediening();
    // this.dynamische_vluchtroute_indicatie.gvda.forEach(i=>i.SetAutoStand("uit"));
    // this.dynamische_vluchtroute_indicatie.gvda.forEach(i=>i.SetAlleVDAsOpAutoBediening());
  },
  GezamenlijkeActiesVluchtVoorbereidEnVluchtGereed() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.evacuatie_richting = evacuatie_richting this.positie_incidentbuis = this.positie_verkeersbuis[incidentbuis] this.evacuatie_zijde = tegenovergestelde(this.positie_incidentbuis);
    // this.omroep_veilige_ruimte.StopOmroepVeiligeRuimte();
    // this.verlichting_veilige_ruimte.SetAutobedieningsStand( "aan" );
    // this.verlichting_veilige_ruimte.SetOpAutobediening();
    // this.overdruk_veilige_ruimte.SetAutobedieningsStand(this.positie_incidentbuis);
    // this.overdruk_veilige_ruimte.SetOpAutobediening();
    // ;
    // IF this.vergrendelbaar = "ja";
    // THEN this.RvVDV[incidentbuis].SetAutoStand("ontgrendeld");
    // this.RvVDV[3 - incidentbuis].SetAutoStand("vergrendeld");
    // this.RvVDV.forEach(i=>i.SetOpAutobediening());
    // END_;
    // IF;
    // IF this."dwarsverbindingen" = "ja";
    // THEN this.dynamische_vluchtroute_indicatie.SetAutobedieningsStandAan( this.evacuatie_zijde );
    // ELSE this.dynamische_vluchtroute_indicatie.SetAutobedieningsStandAan( evacuatie_richting );
    // END_;
    // IF this.dynamische_vluchtroute_indicatie.SetOpAutobediening();
    // this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    // SetGeluidsbakensAutoStand("uit");
    // this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    // SetAlleGeluidsbakensOpAutoBediening();
    // this.dynamische_vluchtroute_indicatie.gvda.forEach(i=>i.SetAutoStand("uit"));
    // this.dynamische_vluchtroute_indicatie.gvda.forEach(i=>i.SetAlleVDAsOpAutoBediening());
  },
  OnderbreekOmroepVoorGeluidsbakenboodschap() {
    // TODO: SyntaxError: Unexpected token ')'
    // this.omroep_veilige_ruimte.StopAfspelenBoodschap();
    // this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    // SpeelOpgenomenBoodschap("ontruiming_bij_ontgrendelde_vluchtdeur");
    // this.ontgrendelboodschap_geluidsbakens_gestart = "ja";
  },
  StopGeluidsbakenboodschapEnHervatOmroep() {
    // TODO: SyntaxError: Unexpected token ')'
    // this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    // SetGeluidsbakensAutoStand("uit");
    // this.ontgrendelboodschap_geluidsbakens_gestart = "nee" this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    // SetGeluidsbakenBoodschap("standaard_bericht");
    // ;
    // IF (this."dwarsverbindingen" = "nee");
    // THEN this.omroep_veilige_ruimte.AfspelenBoodschap();
    // END_IF;
  },
  BewaakOntruimingsboodschapGeluidsbakensVeiligeRuimte() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.state === ("vlucht_gereed" | "evacuatie")) &&
    //   (this.vergrendelbaar === "ja") &&
    //   (this.positie_verkeersbuis[i] === tegenovergestelde(this.positie_incidentbuis))
    // ) {
    //   IF this.RvVDV[i].doel_vergrendeling = "vergrendeld";
    //   THEN this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    //   SetGeluidsbakenBoodschap("ontruiming_bij_vergrendelde_vluchtdeur");
    //   ;
    //   ELSIF this.RvVDV[i].doel_vergrendeling = "ontgrendeld";
    //   THEN this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    //   SetGeluidsbakenBoodschap("ontruiming_bij_ontgrendelde_vluchtdeur");
    //   END_IF;
    // }
  },
  BewaakEvacuatierichtingGeluidsbakensVeiligeRuimte() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.vergrendelbaar === "ja") &&
    //   (this.dynamische_vluchtroute_indicatie.richting === ("links" | "rechts"))
    // ) {
    //   IF (this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens[1].
    // this.evacuatierichting_dwars !== this.dynamische_vluchtroute_indicatie.richting);
    //   THEN this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    //   SetEvacuatierichting(this.dynamische_vluchtroute_indicatie.richting, ongeldig);
    //   END_;
    //   IF;
    // }
    // if (
    //   (this.vergrendelbaar === "ja") &&
    //   (this.dynamische_vluchtroute_indicatie.richting === ("aflopend" | "oplopend"))
    // ) {
    //   IF ( this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens[1].
    // this.evacuatierichting_langs !== this.dynamische_vluchtroute_indicatie.richting || this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens[1].
    // this.evacuatierichting_dwars !== tegenovergestelde(this.positie_incidentbuis);
    //   );
    //   THEN this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens.forEach(i=>i.);
    //   SetEvacuatierichting(tegenovergestelde(this.positie_incidentbuis), this.dynamische_vluchtroute_indicatie.richting);
    //   END_IF;
    // }
  },
  CoordineerAfspelenBoodschappenVeiligeRuimte() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.state === "evacuatie") &&
    //   (this.vergrendelbaar === "ja")
    // ) {
    //   IF this.ontgrendelboodschap_geluidsbakens_gestart = "nee" &&
    //   this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens[1].
    // this.geluidsbaken_boodschap = "ontruiming_bij_ontgrendelde_vluchtdeur";
    //   THEN;
    //   OnderbreekOmroepVoorGeluidsbakenboodschap();
    //   ;
    //   ELSIF this.ontgrendelboodschap_geluidsbakens_gestart = "ja" &&
    //   this.dynamische_vluchtroute_indicatie.groep_van_geluidsbakens[1].
    // this.aantal_boodschap_gespeeld >= this.aantal_ontgrendelboodschappen;
    //   THEN;
    //   StopGeluidsbakenboodschapEnHervatOmroep();
    //   END_IF;
    // }
  },
};
Middenwand = function(){}
Middenwand.prototype = {
  NaarNormaal() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.state = "normaal" this.RvVDV.SetAutoStand("vergrendeld");
    // this.RvVDV.SetOpAutobediening();
  },
  NaarVluchtGereed() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.state = "vlucht_gereed" this.RvVDV.SetAutoStand("vergrendeld");
    // this.RvVDV.SetOpAutobediening();
  },
  NaarEvacuatie() {
    if (
      (this.state === "vlucht_gereed")
    ) {
      this.state = "evacuatie";
    }
  },
  NaarOnderhoud() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.state = "onderhoud" this.RvVDV.SetAutoStand("ontgrendeld");
    // this.RvVDV.SetOpAutobediening();
  },
};
Vloeistofafvoersysteem = function(){}
Vloeistofafvoersysteem.prototype = {
  SetOpHandbediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze !== "hand")
    // ) {
    //   this.hand_state = this.auto_state this.hand_afvoerrichting = this.auto_afvoerrichting this.bedieningswijze = "hand";
    // }
  },
  SetOpAutobediening() {
    this.bedieningswijze = "auto";
  },
  SetGeheelOpAutobediening() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.bedieningswijze = "auto" this.vuilvloeistofVPI.forEach(i=>i.SetRegimeOpAutobediening());
    // this.normaalvloeistofVPI.forEach(i=>i.SetRegimeOpAutobediening());
    // this.afvoerkeuze.forEach(i=>i.SetAfvoerkeuzeOpAutobediening());
  },
  NaarUitHand() {
    if (
      (this.bedieningswijze === "hand")
    ) {
      this.hand_state = "uit";
    }
  },
  NaarNormaalHand() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze === "hand")
    // ) {
    //   this.hand_state = "normaal" this.hand_afvoerrichting = this.normaal_afvoer_richting;
    // }
  },
  NaarCalamiteitHand() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.bedieningswijze === "hand")
    // ) {
    //   this.hand_state = "calamiteit" this.hand_afvoerrichting = richting;
    // }
  },
  NaarGeheelNormaalBevestigd() {
    // TODO: SyntaxError: Unexpected token 'this'
    // if (
    //   (this.auto_state === "normaal")
    // ) {
    //   this.bevestiging_normaal_gewenst = "nee" this.hand_state = "normaal" this.hand_afvoerrichting = this.normaal_afvoer_richting;
    //   SetGeheelOpAutobediening();
    // }
  },
  SetAfvoerrichtingHand() {
    if (
      (this.bedieningswijze === "hand")
    ) {
      this.hand_afvoerrichting = richting;
    }
  },
  NaarCalamiteitAuto() {
    // TODO: SyntaxError: Unexpected token 'this'
    // this.bevestiging_normaal_gewenst = "nee" this.auto_state = "calamiteit" this.auto_afvoerrichting = richting;
    // SetGeheelOpAutobediening();
  },
  NaarUitgesteldNormaalAuto() {
    // TODO: SyntaxError: Unexpected token 'this'
    // SetOpHandbediening( );
    // this.auto_state = "normaal" this.auto_afvoerrichting = this.normaal_afvoer_richting this.bevestiging_normaal_gewenst = "ja";
  },
  NaarCalamiteit() {
    this.vuilvloeistofVPI.forEach(i=>i.SetAutoRegime( "uit" ));
    this.normaalvloeistofVPI.forEach(i=>i.SetAutoRegime( "bergen" ));
  },
  NaarNormaal() {
    this.vuilvloeistofVPI.forEach(i=>i.SetAutoRegime( "lozingsschema" ));
    this.normaalvloeistofVPI.forEach(i=>i.SetAutoRegime( "leeghouden" ));
  },
  NaarUit() {
    this.vuilvloeistofVPI.forEach(i=>i.SetAutoRegime( "uit" ));
    this.normaalvloeistofVPI.forEach(i=>i.SetAutoRegime( "uit" ));
  },
  HandhaafRegimes() {
    if (
      (this.state === "normaal")
    ) {
      NaarNormaal();
    }
  },
  HandhaafAfvoerrichting() {
    this.afvoerkeuze.forEach(i=>i.SetAutoAfvoerkeuze( this.doel_afvoerrichting ));
  },
};
Twee_Buis_State_Controle = function(){}
Twee_Buis_State_Controle.prototype = {
  ResetOnderdrukkingen() {
    this.signaleringen.forEach(i=>i.StopOnderdrukken());
  },
  TunnelActiesBijCalamiteit() {
    ResetOnderdrukkingen();
    this.CaDo.forEach(i=>i.Alarm_CaDoNietGesloten.StartOnderdrukken());
    this.overdruk_grensruimtes.forEach(i=>i.SetAutobedieningsStand( "aan" ));
    this.overdruk_grensruimtes.forEach(i=>i.SetOpAutobediening());
    this.cctv_systeem.SetVerkeersbuisDetailKanaalDerden( vb );
    this.cctv_systeem.SetDoorgifteKanaalDerden( "aan" );
    this.blusvoorziening.SetHandVraag("bewaken");
    this.VeVa.forEach(i=>i.VergrendelPlaatselijkeBediening());
  },
  TunnelActiesBijBedrijfOfOnderhoud() {
    // TODO: SyntaxError: Unexpected token 'this'
    // ResetOnderdrukkingen();
    // ;
    // IF this.state = "onderhoud";
    // THEN this.CaDo.forEach(i=>i.Alarm_CaDoNietGesloten.StartOnderdrukken());
    // END_;
    // IF this.overdruk_grensruimtes.forEach(i=>i.SetAutobedieningsStand( "aan" ));
    // this.overdruk_grensruimtes.forEach(i=>i.SetOpAutobediening());
    // this.cctv_systeem.SetDoorgifteKanaalDerden( "uit" );
    // this.blusvoorziening.SetHandVraag("bewaken");
    // this.VeVa.forEach(i=>i.VergrendelPlaatselijkeBediening());
    // this.waarschuwingsinstallatie.SetOntruimingsalarmVeilig();
  },
  TunnelActiesBijCalamiteitVolledig() {
    this.waarschuwingsinstallatie.SetOntruimingsalarmBeperktVeilig();
  },
  TunnelActiesBijCalamiteitEvacuatie() {
    this.waarschuwingsinstallatie.SetOntruimingsalarmOnveilig();
  },
  BewaakCalamiteit() {
    // TODO: SyntaxError: Unexpected string
    // if (
    //   ((this."verkeersbuis"[].substate !== "calamiteit_volledig") &&
    //   (this."verkeersbuis"[].substate !== "calamiteit_evacuatie") &&
    //   (this."verkeersbuis"[i].calamiteit_detectie_tijd >= this.calamiteit_tijd) &&
    //   (this."verkeersbuis"[i].substate !== "onderhoud_regulier") &&
    //   (this."verkeersbuis"[i].substate !== "onderhoud_herstel" ) || (this."verkeersbuis"[].substate !== "calamiteit_volledig") &&
    //   (this."verkeersbuis"[].substate !== "calamiteit_evacuatie") &&
    //   (this."verkeersbuis"[i].calamiteit_detectie_tijd >= this.calamiteit_tijd) &&
    //   (this."verkeersbuis"[i].substate === ( "onderhoud_regulier" | "onderhoud_herstel" )) &&
    //   (this."verkeersbuis"[i].bediening_zegt_calamiteit === "ja" ))
    // ) {
    //   j( j !== i &&
    //   this."verkeersbuis"[j].substate !== "calamiteit_ondersteunend": this."verkeersbuis"[j].CalamiteitOndersteunend(this."verkeersbuis"[i].rijrichting));
    //   this."verkeersbuis"[i].CalamiteitVolledig();
    // }
  },
  HandhaafBluswatervoorzieningStand() {
    // TODO: SyntaxError: Unexpected string
    // if (
    //   (this."verkeersbuis"[i].blusvraag === "ja")
    // ) {
    //   this.blusvoorziening.SetAutoVraag("blussen");
    // }
    // if (
    //   (this."verkeersbuis"[].blusvraag === "nee")
    // ) {
    //   this.blusvoorziening.SetAutoVraag("bewaken");
    // }
  },
  BewaakTunnelRelaties() {
    // TODO: SyntaxError: Unexpected string
    // if (
    //   (this.state !== "calamiteit") &&
    //   (this."verkeersbuis"[i].substate === ("calamiteit_volledig" | "calamiteit_evacuatie"))
    // ) {
    //   this.state = "calamiteit";
    //   TunnelActiesBijCalamiteit(i);
    // }
    // if (
    //   (this.state !== "bedrijf") &&
    //   (this."verkeersbuis"[].substate === ( "bedrijf_standby" | "bedrijf_normaal" ))
    // ) {
    //   this.state = "bedrijf";
    //   TunnelActiesBijBedrijfOfOnderhoud();
    // }
    // if (
    //   (this.state !== "onderhoud") &&
    //   (this."verkeersbuis"[].substate === ( "onderhoud_regulier" | "onderhoud_herstel" ))
    // ) {
    //   this.state = "onderhoud";
    //   TunnelActiesBijBedrijfOfOnderhoud();
    // }
    // if (
    //   (this.state !== "deel_bedrijf") &&
    //   (this."verkeersbuis"[i].substate === ( "bedrijf_standby" | "bedrijf_normaal" )) &&
    //   (this."verkeersbuis"[j].substate === ( "gestart" | "onderhoud_regulier" | "onderhoud_herstel" )) &&
    //   (this."verkeersbuis"[].substate === ( "gestart" | "bedrijf_standby" | "bedrijf_normaal" | "onderhoud_regulier" | "onderhoud_herstel" ))
    // ) {
    //   this.state = "deel_bedrijf";
    //   TunnelActiesBijBedrijfOfOnderhoud();
    // }
  },
  BewaakSubstatesCalamiteit() {
    // TODO: SyntaxError: Unexpected string
    // if (
    //   (this.substate_calamiteit !== "calamiteit_volledig") &&
    //   (this."verkeersbuis"[].substate !== "calamiteit_evacuatie") &&
    //   (this."verkeersbuis"[i].substate === "calamiteit_volledig")
    // ) {
    //   this.substate_calamiteit = "calamiteit_volledig";
    //   TunnelActiesBijCalamiteitVolledig();
    // }
    // if (
    //   (this.substate_calamiteit !== "calamiteit_evacuatie") &&
    //   (this."verkeersbuis"[i].substate === "calamiteit_evacuatie")
    // ) {
    //   this.substate_calamiteit = "calamiteit_evacuatie";
    //   TunnelActiesBijCalamiteitEvacuatie();
    // }
    // if (
    //   (this."verkeersbuis"[].substate !== "calamiteit_evacuatie") &&
    //   (this."verkeersbuis"[].substate !== "calamiteit_volledig")
    // ) {
    //   this.substate_calamiteit = ongeldig;
    // }
  },
  BewaakBuisRelatieCalamiteit() {
    // TODO: SyntaxError: Unexpected string
    // if (
    //   (this."verkeersbuis"[i].substate === ( "calamiteit_volledig" | "calamiteit_evacuatie" ))
    // ) {
    //   j( j !== i &&
    //   this."verkeersbuis"[j].substate !== "calamiteit_ondersteunend": this."verkeersbuis"[j].CalamiteitOndersteunend( this."verkeersbuis"[i].rijrichting ));
    // }
  },
  BewaakBuisRelatieOnderhoudHerstel() {
    // TODO: SyntaxError: Unexpected string
    // if (
    //   (this."verkeersbuis"[i].substate === ( "onderhoud_herstel" ))
    // ) {
    //   j (j !== i &&
    //   this."verkeersbuis"[j].substate = "calamiteit_ondersteunend" : this."verkeersbuis"[j].OnderhoudHerstelNaCalamiteit());
    // }
  },
};
Veilige_Ruimte_State_Controle = function(){}
Veilige_Ruimte_State_Controle.prototype = {
};
Middenwand_State_Controle = function(){}
Middenwand_State_Controle.prototype = {
  BewaakMiddenwandVanuitVerkeersBuisSubStates() {
    // TODO: SyntaxError: Unexpected string
    // if (
    //   (this."verkeersbuis"[i].substate === ( "bedrijf_normaal" | "bedrijf_standby" )) &&
    //   (this.middenwand.state !== "normaal")
    // ) {
    //   this.middenwand.NaarNormaal();
    // }
    // if (
    //   (this."verkeersbuis"[i].substate === "calamiteit_volledig") &&
    //   (this.middenwand.state !== "vlucht_gereed") &&
    //   (this.middenwand.state !== "evacuatie")
    // ) {
    //   this.middenwand.NaarVluchtGereed();
    // }
    // if (
    //   (this."verkeersbuis"[i].substate === "calamiteit_evacuatie") &&
    //   (this.middenwand.state !== "evacuatie")
    // ) {
    //   IF this.middenwand.state !== "vlucht_gereed";
    //   THEN this.middenwand.NaarVluchtGereed();
    //   END_;
    //   IF this.middenwand.NaarEvacuatie();
    // }
    // if (
    //   (this."verkeersbuis"[].substate === ( "onderhoud_herstel" | "onderhoud_regulier" )) &&
    //   (this.middenwand.state !== "onderhoud")
    // ) {
    //   this.middenwand.NaarOnderhoud();
    // }
  },
};
Vloeistofafvoersysteem_state_controle = function(){}
Vloeistofafvoersysteem_state_controle.prototype = {
};
Rijrichtingwisselaar = function(){}
Rijrichtingwisselaar.prototype = {
  SetRijrichting() {
    // TODO: SyntaxError: Unexpected token ']'
    // if (
    //   (this.wbs.gewenste_rijrichting === richting) &&
    //   (( (this.vb.substate === "gestart") &&
    //   (this.vb.verkeersbuisafsluiter[tegenovergestelde(richting)].
    // this.meest_afgesloten_stand === "gedoofd")
    // || (this.vb.substate === ("bedrijf_normaal" | "onderhoud_regulier" | "onderhoud_herstel")) &&
    //   (this.vb.verkeersbuisafsluiter[].
    // this.meest_afgesloten_stand === "gedoofd") ))
    // ) {
    //   this.vb.SetRijrichting(richting);
    //   this.vb.ventilatie.SetAutobedieningsRichting(richting);
    //   this.vb.sos.SetRichting(richting);
    //   this.vb.verkeersbuisverlichting.SetRichting(richting);
    //   this.vb.cctv.SetRijrichting(richting);
    //   this.vb.verkeersbuisafsluiter[tegenovergestelde(richting)].SetInGebruik("nee");
    //   this.vb.verkeersbuisafsluiter[richting].SetInGebruik("ja");
    //   ;
    //   IF this.vb.hoogtedetectie_aanwezig = "ja";
    //   THEN this.vb.hoogtedetectie[tegenovergestelde(richting)].SetInGebruik("nee");
    //   this.vb.hoogtedetectie[richting].SetInGebruik("ja");
    //   END_IF;
    // }
  },
  GeefRijrichtingVrijVoorwaardelijk() {
    if (
      (richting === this.wbs.gewenste_rijrichting) &&
      (richting === this.rijrichting) &&
      (this.techniek_volgt_rijrichting === "ja") &&
      (this.wbs.wbs_verzoek_getimeout === "nee") &&
      (this.wbs.wbs_wacht_op_antwoord === "ja")
    ) {
      GeefRijrichtingVrijOnvoorwaardelijk( richting, this.overrulecode );
    }
  },
  GeefRijrichtingVrijOnvoorwaardelijk() {
    if (
      (richting === this.wbs.gewenste_rijrichting) &&
      (overrulecode === this.overrulecode)
    ) {
      this.wbs.VerzendBericht( richting );
    }
  },
};
VluchtrouteOndersteuning = function(){}
VluchtrouteOndersteuning.prototype = {
  BewaakActiesOntgrendeling() {
    if (
      (this.vb.substate === "calamiteit_ondersteunend") &&
      (huidige_tijd > this.vb.tijdstip_verkeersvrij)
    ) {
      this.RvVDV.SetAutoStand("ontgrendeld");
    }
  },
  BewaakAanvraagKruizenBijVluchten() {
    if (
      (this.vb.substate === "calamiteit_ondersteunend") &&
      (huidige_tijd > this.vb.tijdstip_verkeersvrij)
    ) {
      this.vb.verkeersbuisafsluiter_in_gebruik.mtm.InstellenKruizenInBuis();
    }
    if (
      (this.vb.substate !== "calamiteit_ondersteunend") &&
      (this.vb.substate !== "gestart")
    ) {
      this.vb.verkeersbuisafsluiter_in_gebruik.
    this.mtm.OpheffenKruizenInBuis();
    }
  },
  BewaakVluchtrouteDoorVerkeersbuis() {
    if (
      (this.vb.substate === "calamiteit_ondersteunend") &&
      (huidige_tijd > this.vb.tijdstip_verkeersvrij)
    ) {
      this.vb.vluchtdeurindicatie.dVIV.forEach(i=>i.SetDVIVAutoStand( tegenovergestelde(this.vb.rijrichting_calamiteitenbuis)));
    }
  },
  BewaakOntruimingsBoodschapGeluidsbakens() {
    // TODO: SyntaxError: Unexpected token ';'
    // if (
    //   (this.RvVDV.doel_vergrendeling === "vergrendeld")
    // ) {
    //   this.vb.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    //   SetGeluidsbakenBoodschap("ontruiming_bij_vergrendelde_vluchtdeur");
    // }
    // if (
    //   (this.RvVDV.doel_vergrendeling === "ontgrendeld")
    // ) {
    //   IF (this.vb.substate = ("calamiteit_volledig" | "calamiteit_evacuatie");
    //   &&
    //   huidige_tijd < this.RvVDV.tijdstip_doel_vergrendeling + this.periode_ontgrendelings_boodschap);
    //   THEN this.vb.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    //   SetGeluidsbakenBoodschap("ontruiming_bij_ontgrendelde_vluchtdeur");
    //   ELSE this.vb.vluchtdeurindicatie.alle_geluidsbakens_in_buis.;
    //   SetGeluidsbakenBoodschap("standaard_bericht");
    //   END_IF;
    // }
  },
  BewaakEvacuatieOndersteunendeBuis() {
    if (
      (this.RvVDV.doel_vergrendeling === "ontgrendeld") &&
      (this.vb.substate === "calamiteit_ondersteunend") &&
      (this.ib.substate === "calamiteit_evacuatie") &&
      (this.vb.vluchtdeurindicatie.dVIV[i] !== 0) &&
      ((this.tijdstip_evacuatieboodschap_ondersteunende_buis_ingesteld === ongeldig || this.tijdstip_evacuatieboodschap_ondersteunende_buis_ingesteld < this.RvVDV.tijdstip_doel_vergrendeling))
    ) {
      this.vb.omroep.SetAfTeSpelenBoodschap( this.boodschap_ontruiming_ondersteunendebuis, this.vb.boodschap_herhalingsperiode );
      this.vb.omroep.AfspelenBoodschapVerkeersbuis();
      this.tijdstip_evacuatieboodschap_ondersteunende_buis_ingesteld = huidige_tijd;
    }
  },
};
UKVC1___Applicatiebediening__GUI) = function(){}
UKVC1___Applicatiebediening__GUI).prototype = {
};
UKVC3___Camerabediening__PTZ) = function(){}
UKVC3___Camerabediening__PTZ).prototype = {
};
UKVC6___Alarmen = function(){}
UKVC6___Alarmen.prototype = {
};
Omroep = function(){}
Omroep.prototype = {
};
UKVC8___Werkplekaansturing__Taakmanagement,_Control) = function(){}
UKVC8___Werkplekaansturing__Taakmanagement,_Control).prototype = {
  DoorgevenVideoVerzoek() {
    // TODO: SyntaxError: Invalid or unexpected token
    // if (
    //   ((this.video_verzoek !== {} )) &&
    //   ((this.bedientaken[i].taakcontext === this.taakcontext["to_actief"])) &&
    //   ((this.bedientaken[i].sessieGestart === "ja"))
    // ) {
    //   a,b( ( (a < b);
    //   &&
    //   (this.video_verzoek[a].viewer_id = this.video_verzoek[b].viewer_id)): verwijder(this.video_verzoek, a));
    //   resultaat = this.bedientaken[i].taakInfo.controlInterface.ukvc8::vraagVideoConnectie( this.bedientaken[i].sessiekey, this.video_verzoek);
    //   ;
    //   IF ( this.bedientaken[j].taakcontext = this.taakcontext["to_inzien"] &&
    //   this.bedientaken[j].sessieGestart = "ja" );
    //   THEN p((this.video_verzoek[p].ptz_interface !== leeg ): this.video_verzoek[p].ptz_interface = leeg);
    //   s((this.video_verzoek[s].eigenschappen[1] = Schouw ): verwijder(this.video_verzoek, s);
    //   resultaat = this.bedientaken[j].taakInfo.controlInterface.ukvc8::vraagVideoConnectie( this.bedientaken[j].sessiekey, this.video_verzoek);
    //   END_;
    //   IF this.video_verzoek = {};
    // }
  },
  DoorgevenActieveViewerVerzoeken() {
    // TODO: SyntaxError: Unexpected token ')'
    // if (
    //   ((this.actieveViewer_verzoek !== {} ) (this.bedientaken[i].taakcontext === this.taakcontext["to_actief"])) &&
    //   ((this.bedientaken[i].sessieGestart === "ja")) &&
    //   ()
    // ) {
    //   resultaat = this.bedientaken[i].taakInfo.controlInterface.ukvc8::verzoekActieveViewer( this.bedientaken[i].sessiekey, this.actieveViewer_verzoek);
    //   this.actieveViewer_verzoek = leeg;
    // }
  },
};
UKVC9___Noodbediening = function(){}
UKVC9___Noodbediening.prototype = {
};