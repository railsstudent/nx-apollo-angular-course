import { Injectable } from '@angular/core'
import { SpeechLanguage, TextToSpeech } from '@nx-apollo-angular-course/api-interfaces'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class VoiceService {
  private readonly isSupported: boolean
  private voices: SpeechSynthesisVoice[] = []
  private speakVoices: Record<SpeechLanguage, SpeechSynthesisVoice> = {
    [SpeechLanguage.English]: null,
    [SpeechLanguage.Chinese]: null,
    [SpeechLanguage.Spanish]: null,
    [SpeechLanguage.Portuguese]: null,
  }

  private voicesAvailableSub$ = new BehaviorSubject<boolean>(false)
  voicesAvailable$ = this.voicesAvailableSub$.asObservable()

  constructor() {
    this.isSupported = !!window.speechSynthesis

    if (this.isSupported) {
      this.voices = window.speechSynthesis.getVoices()
      this.buildSpeakVoices()

      window.speechSynthesis.addEventListener('voiceschanged', () => {
        this.voices = window.speechSynthesis.getVoices()
        this.buildSpeakVoices()
        this.voicesAvailableSub$.next(true)
      })
    }
  }

  private buildSpeakVoices(): void {
    this.speakVoices[SpeechLanguage.English] = this.voices.find((voice) => voice.name === 'Google US English')
    this.speakVoices[SpeechLanguage.Spanish] = this.voices.find(
      (voice) => voice.name === 'Google español de Estados Unidos',
    )
    this.speakVoices[SpeechLanguage.Chinese] = this.voices.find((voice) => voice.lang === 'zh-HK')
    this.speakVoices[SpeechLanguage.Portuguese] = this.voices.find(
      (voice) => voice.name === 'Google português do Brasil',
    )
  }

  isVoicesAvailable(): boolean {
    return this.voicesAvailableSub$.getValue()
  }

  getSelectedVoice(language: string): SpeechSynthesisVoice {
    const speechLanguage = language as keyof typeof SpeechLanguage
    const typedSpeechLanguage = SpeechLanguage[speechLanguage]
    return this.speakVoices[typedSpeechLanguage]
  }

  speak(speechInput: TextToSpeech): void {
    const { text, voice } = speechInput
    if (!this.isSupported) {
      return
    }

    this.stop()

    if (voice) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = voice
      utterance.rate = 0.75
      utterance.volume = 1
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  stop(): void {
    if (!this.isSupported) {
      return
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }
  }
}
