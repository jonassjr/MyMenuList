import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const Faqs = () => {

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Como criar e personalizar um menu?</AccordionTrigger>
        <AccordionContent>
          Na página inicial, haverá um botão Criar Menu. Ao clicar nele, um formulário
          de criação de menu será exibido. Após criar o menu, ele aparecerá na página inicial;
          basta clicá-lo para ser redirecionado à tela de edição.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Como atualizar ou excluir itens do menu?</AccordionTrigger>
        <AccordionContent>
          Para atualizar um item basta clicar no card com a foto do item que será
          redirecionado para tela de edição de item. Para excluir um item basta
          clicar no botão no canto superior direito do item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Como acessar e compartilhar o QR Code</AccordionTrigger>
        <AccordionContent>
          Para ver o qr code basta acessar configurações e procurar por qr code e fazer o download.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}