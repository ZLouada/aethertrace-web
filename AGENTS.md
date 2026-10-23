<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Fit animated wordmarks to their container after fonts load; this preserves the complete brand at any screen width.
- Keep fixed-width product replicas in Scaled so they always fit their container with no horizontal scrolling; on phones, render a narrower replica variant rather than shrinking the desktop one below a readable scale.
- Use stacked compact variants for multi-pane feature replicas on phones and share their content with desktop variants; this preserves readable labels without duplicating product data.
- Keep updated release UI replicas in a dedicated presentation module with desktop and narrow variants; this isolates screenshot-specific layouts from shared animation primitives.
