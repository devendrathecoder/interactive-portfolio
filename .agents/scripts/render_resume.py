import fitz, os
src = 'attached_assets/Devendra_Meena_FullStack_Intern_1787546398958.pdf'
out_dir = '.agents/outputs'
os.makedirs(out_dir, exist_ok=True)
doc = fitz.open(src)
for index, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    path = os.path.join(out_dir, f'resume-page-{index + 1}.png')
    pix.save(path)
    print(path)
print('pages', len(doc))
